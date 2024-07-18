import { dev } from '$app/environment';
import {
	LOCAL_URL,
	REPLICATE_API_TOKEN,
	REPLICATE_WEBHOOK_SIGNING_KEY,
	TRANSCRIPTION_CALLS_MOCKED,
} from '$env/static/private';
import Replicate, { validateWebhook as validateReplicateWebhook, type Prediction } from 'replicate';
import { predictionMock } from './transcriptor.mocks';
import prisma from '../../prisma';
import { PredictionStatus, type Segment } from '@prisma/client';
import { predictionWebHookData } from '$lib/transcriptor/replicate/transcriptor.mocks.js';
import { Language } from '../../enums';
import logger from '../../logger';
import type { Output, TranscriptorEngine } from '..';

const createAudioTranscription = async (audioUrl: string): Promise<Output> => {
	try {
		const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });
		const WEBHOOK_HOST = dev ? LOCAL_URL : process.env.VERCEL_URL;

		if (TRANSCRIPTION_CALLS_MOCKED === 'true') {
			logger.info('Mocked prediction');
			return {
				error: null,
				prediction: {
					id: predictionMock.id,
					status: mapToPredictionStatus(predictionMock.status),
				},
			};
		}

		const prediction = await replicate.predictions.create({
			version: '4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2',
			input: {
				audio: audioUrl,
				model: 'large-v3',
				// language: 'ca',
				translate: false,
				temperature: 0,
				transcription: 'plain text',
				suppress_tokens: '-1',
				logprob_threshold: -1,
				no_speech_threshold: 0.6,
				condition_on_previous_text: true,
				compression_ratio_threshold: 2.4,
				temperature_increment_on_fallback: 0.2,
			},
			webhook: `${WEBHOOK_HOST}/api/prediction-webhook`,
			webhook_events_filter: ['completed'],
		});

		return {
			error: null,
			prediction: {
				id: prediction.id,
				status: mapToPredictionStatus(prediction.status),
			},
		};
	} catch (error) {
		logger.error(new Error('Replicate failed', { cause: error }));
		return { prediction: null, error: JSON.stringify(error) };
	}
};

const handleWebhookEvent = async (prediction: Prediction) => {
	if (prediction?.status !== 'succeeded') {
		logger.info('Skipping incomplete or unsuccesful prediction', { status: prediction.status });
		return;
	}

	try {
		await prisma.file.update({
			where: { id: prediction.id },
			data: {
				status: PredictionStatus.COMPLETED,
				prediction: {
					create: {
						fileId: prediction.id,
						createdAt: prediction.created_at,
						completedAt: prediction.started_at,
						transcription: prediction.output.transcription,
						language: languageFromPrediction(prediction),
						segments: {
							createMany: {
								data: segmentsFromPrediction(prediction),
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
			where: { id: prediction.id },
			data: {
				status: PredictionStatus.FAILED,
			},
		});
	}
};

const validateWebhook = async (req: Request) => {
	const isValid = await validateReplicateWebhook(req, REPLICATE_WEBHOOK_SIGNING_KEY);
	return isValid;
};

const mapToPredictionStatus = (status: Prediction['status']): PredictionStatus => {
	return {
		processing: PredictionStatus.IN_PROGRESS,
		starting: PredictionStatus.IN_PROGRESS,
		succeeded: PredictionStatus.COMPLETED,
		failed: PredictionStatus.FAILED,
		canceled: PredictionStatus.FAILED,
	}[status] as PredictionStatus;
};

const segmentsFromPrediction = (prediction: Prediction): Segment[] => {
	const predictionSegments = prediction.output.segments || [];
	return predictionSegments.map(
		(segment: any, index: number) =>
			({
				id: (segment.id || index).toString().padStart(3, '0'),
				start: segment.start,
				end: segment.end,
				text: segment.text,
			}) as Segment,
	);
};

const languageFromPrediction = (prediction: Prediction): Language => {
	switch (prediction.output.detected_language) {
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
