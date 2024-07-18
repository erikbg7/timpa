import logger from '$lib/logger';
import { error, json } from '@sveltejs/kit';
import { getTranscriptor } from '$lib/transcriptor/index.js';
import { TRANSCRIPTION_CALLS_MOCKED, SUPABASE_STORGE_BUCKET } from '$env/static/private';
import { PredictionStatus } from './../../../lib/enums';

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
	const transcriptor = getTranscriptor('AssemblyAi');
	const transcription = await transcriptor.createAudioTranscription(signedUrl.data.signedUrl);

	if (transcription.error || !transcription.prediction) {
		logger.error('Error creating transcription - ' + JSON.stringify(transcription.error));
		return error(400, { message: 'Error creating transcription' });
	}
	if (transcription.prediction.status !== PredictionStatus.IN_PROGRESS) {
		logger.error('Prediction creation failed');
		await supabase.storage.from(SUPABASE_STORGE_BUCKET).remove([fileUrl]);
	}

	// CREATE INITIAL PREDICTION
	try {
		await prisma.file.create({
			data: {
				...transcription.prediction,
				url: fileUrl,
				name: fileName,
				duration: parseFloat(duration),
				size: file.size,
				extension: fileExtension,
				customerId: session.user.id,
			},
		});

		if (TRANSCRIPTION_CALLS_MOCKED === 'true') {
			logger.info('Mocked Webhook event handling');
			setTimeout(() => {
				transcriptor.handleWebhookEvent(transcriptor.predictionWebHookData);
			}, 10000);
		}

		return json(200);
	} catch (e) {
		logger.error(new Error('Error creating prediction', { cause: e }));
		await supabase.storage.from(SUPABASE_STORGE_BUCKET).remove([fileUrl]);
		await prisma.file.update({
			where: { id: transcription.prediction.id },
			data: {
				status: PredictionStatus.FAILED,
			},
		});
		return error(400, { message: 'Error creating prediction' });
	}
}
