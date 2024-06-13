import { dev } from '$app/environment';
import { REPLICATE_API_TOKEN, REPLICATE_CALL_MOCKED } from '$env/static/private';
import Replicate, { type Prediction } from 'replicate';
import { predictionMock } from './transcriptor.mocks';
import prisma from './prisma';
import { PredictionStatus, type Segment } from '@prisma/client';
import { Language } from './enums';
import logger from './logger';

type SuccessOutput = { prediction: Prediction; error: null };
type ErrorOutput = { prediction: null; error: string };
type Output = SuccessOutput | ErrorOutput;

export const createAudioTranscription = async (audioUrl: string): Promise<Output> => {
	try {
		const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });
		const WEBHOOK_HOST = dev
			? 'https://3ae9-185-253-144-45.ngrok-free.app'
			: process.env.VERCEL_URL;

		if (REPLICATE_CALL_MOCKED) {
			logger.info('Mocked prediction');
			return { prediction: predictionMock, error: null };
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

		return { prediction, error: null };
	} catch (error) {
		logger.error(new Error('Replicate failed', { cause: error }));
		return { prediction: null, error: JSON.stringify(error) };
	}
};

export const handleWebhookEvent = async (prediction: Prediction) => {
	if (prediction?.status !== 'succeeded') {
		logger.info('Skipping incomplete or unsuccesful prediction', { status: prediction.status });
		return;
	}

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
