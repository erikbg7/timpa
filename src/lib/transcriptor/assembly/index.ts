// To associate metadata for a specific transcription request, you can add your own query parameters to the webhook URL.
// https://example.com/webhook?customer_id=1234&order_id=5678
// Now, when you receive the webhook delivery, you'll know the customer who requested it.

import logger from '$lib/logger';
import { AssemblyAI, type Transcript, type TranscriptReadyNotification } from 'assemblyai';
import type { Output, TranscriptorEngine } from '..';
import { dev } from '$app/environment';
import prisma from '$lib/prisma';
import { Language, PredictionStatus } from '$lib/enums';
import type { Segment } from '@prisma/client';
import {
	ASSEMBLY_API_KEY,
	ASSEMBLY_WEBHOOK_SIGNING_KEY,
	LOCAL_URL,
	TRANSCRIPTION_CALLS_MOCKED,
} from '$env/static/private';
import { predictionMock, predictionWebHookData } from '../replicate/transcriptor.mocks';

export const createAudioTranscription = async (audioUrl: string): Promise<Output> => {
	try {
		const assembly = new AssemblyAI({ apiKey: ASSEMBLY_API_KEY });
		const WEBHOOK_HOST = dev ? LOCAL_URL : process.env.VERCEL_URL;

		if (TRANSCRIPTION_CALLS_MOCKED === 'true') {
			logger.info('Mocked prediction');
			return {
				error: null,
				prediction: {
					id: predictionMock.id,
					status: PredictionStatus.IN_PROGRESS,
				},
			};
		}

		const prediction = await assembly.transcripts.submit({
			audio: audioUrl,
			speech_model: 'nano',
			webhook_url: `${WEBHOOK_HOST}/api/prediction-webhook`,
			webhook_auth_header_name: 'X-My-Webhook-Secret',
			webhook_auth_header_value: ASSEMBLY_WEBHOOK_SIGNING_KEY,
			language_detection: true,
			// speaker_labels: true To identify speakers https://www.assemblyai.com/app/
		});

		return {
			error: null,
			prediction: {
				id: prediction?.id,
				status: mapToPredictionStatus(prediction.status),
			},
		};
	} catch (error) {
		logger.error(new Error('AssemblyAi failed', { cause: error }));
		return { prediction: null, error: JSON.stringify(error) };
	}
};

const handleWebhookEvent = async (prediction: TranscriptReadyNotification) => {
	console.log({ prediction });
	if (prediction?.status !== 'completed') {
		logger.info('Skipping incomplete or unsuccesful prediction', { status: prediction.status });
		return;
	}

	try {
		const assembly = new AssemblyAI({ apiKey: ASSEMBLY_API_KEY });
		const transcriptId = prediction.transcript_id;

		const transcript = await assembly.transcripts.get(transcriptId);

		await prisma.file.update({
			where: { id: transcriptId },
			data: {
				status: PredictionStatus.COMPLETED,
				prediction: {
					create: {
						fileId: transcriptId,
						transcription: transcript.text || '',
						language: languageFromPrediction(transcript),
						segments: {
							createMany: {
								data: segmentsFromPrediction(transcript),
							},
						},
					},
				},
			},
		});
	} catch (error) {
		logger.error('Error handling webhook event', { cause: error });
		// await supabase.storage.from(SUPABASE_STORGE_BUCKET).remove([fileUrl]);
		await prisma.file.update({
			where: { id: prediction.transcript_id },
			data: {
				status: PredictionStatus.FAILED,
			},
		});
	}
};

const validateWebhook = async (req: Request) => {
	const secret = req.headers.get('X-My-Webhook-Secret');
	console.log({ secret });
	if (secret !== ASSEMBLY_WEBHOOK_SIGNING_KEY) {
		return false;
	}
	return true;
};

const mapToPredictionStatus = (status: Transcript['status']): PredictionStatus => {
	return {
		queued: PredictionStatus.IN_PROGRESS,
		processing: PredictionStatus.IN_PROGRESS,
		completed: PredictionStatus.COMPLETED,
		failed: PredictionStatus.FAILED,
		error: PredictionStatus.FAILED,
	}[status] as PredictionStatus;
};

const segmentsFromPrediction = (transcript: Transcript): Segment[] => {
	const predictionWords = transcript.words || [];
	return predictionWords.map(
		(word, index: number) =>
			({
				id: index.toString().padStart(3, '0'),
				start: word.start,
				end: word.end,
				text: word.text,
			}) as Segment,
	);
};

const languageFromPrediction = (transcript: Transcript): Language => {
	switch (transcript.language_code) {
		case 'catalan':
			return Language.CA;
		default:
			return Language.EN;
	}
};

const engine: TranscriptorEngine = {
	createAudioTranscription,
	handleWebhookEvent,
	validateWebhook,
	predictionWebHookData,
};
export default engine;
