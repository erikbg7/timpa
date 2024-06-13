import { error, json } from '@sveltejs/kit';

import { REPLICATE_CALL_MOCKED, SUPABASE_STORGE_BUCKET } from '$env/static/private';
import logger from '$lib/logger';
import { createAudioTranscription, handleWebhookEvent } from '$lib/transcriptor';
import { PredictionStatus } from '@prisma/client';
import { predictionWebHookData } from '$lib/transcriptor.mocks.js';

const MAX_FILE_SIZE = 200000000; // 200MB
const EXPIRATION_TIME = 600; // 10 minutes

export async function POST(event) {
	const supabase = event.locals.supabase;
	const prisma = event.locals.prisma;
	const session = await event.locals.getSession();
	if (!session) {
		logger.error('Unauthorized user');
		return error(401, { message: 'Unauthorized' });
	}

	// GET AND VALIDATE FILE
	const formData = await event.request.formData();
	const file = formData.get('file') as File;
	const duration = formData.get('duration') as string;

	const fileName = file.name;
	const fileExtension = file.name.split('.').pop() as string;
	const fileId = Date.now().toString().concat(`.${fileExtension}`);
	const fileUrl = `${session.user.id}/${fileId}`;

	if (!file || !fileExtension) {
		logger.error('No file found');
		return error(400, { message: 'No file found' });
	}
	if (file.size > MAX_FILE_SIZE) {
		logger.error('File too large');
		return error(400, { message: 'File too large' });
	}

	// UPLOAD FILE TO STORAGE
	const storedFile = await supabase.storage.from(SUPABASE_STORGE_BUCKET).upload(fileUrl, file, {
		cacheControl: '3600',
		upsert: false,
	});

	if (storedFile.error) {
		logger.error('Error uploading file - ' + storedFile.error.message);
		return error(400, { message: 'Error uploading file' });
	}

	// GET FILE SIGNED URL
	const signedUrl = await supabase.storage
		.from(SUPABASE_STORGE_BUCKET)
		.createSignedUrl(fileUrl, EXPIRATION_TIME);

	if (signedUrl.error) {
		logger.error('Error getting signed url - ' + signedUrl.error.message);
		return error(400, { message: 'Error getting signed url' });
	}

	// RUN PREDICTION FROM FILE URL
	const transcription = await createAudioTranscription(signedUrl.data.signedUrl);

	if (transcription.error || !transcription.prediction) {
		logger.error('Error creating transcription - ' + JSON.stringify(transcription.error));
		return error(400, { message: 'Error creating transcription' });
	}

	let predictionStatus: PredictionStatus;
	predictionStatus = PredictionStatus.IN_PROGRESS;

	if (transcription.prediction.status !== 'starting') {
		logger.error('prediction creation failed');
		predictionStatus = PredictionStatus.FAILED;
		await supabase.storage.from(SUPABASE_STORGE_BUCKET).remove([fileUrl]);
	}

	// CREATE INITIAL PREDICTION
	try {
		await prisma.file.create({
			data: {
				id: transcription.prediction.id,
				url: fileUrl,
				name: fileName,
				duration: parseFloat(duration),
				size: file.size,
				extension: fileExtension,
				customerId: session.user.id,
				status: predictionStatus,
			},
		});

		if (REPLICATE_CALL_MOCKED) {
			logger.info('Mocked Webhook event handling');
			setTimeout(() => {
				handleWebhookEvent(predictionWebHookData);
			}, 10000);
		}

		return json(200);
	} catch (e) {
		logger.error(new Error('Error creating prediction', { cause: e }));
		await supabase.storage.from(SUPABASE_STORGE_BUCKET).remove([fileUrl]);
		return error(400, { message: 'Error creating prediction' });
	}
}
