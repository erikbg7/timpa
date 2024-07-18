import type { Prediction } from 'replicate';

import AssemblyAiEngine from './assembly';
import ReplicateEngine from './replicate';
import type { Prisma } from '@prisma/client';

type PredictionRequest = Pick<Prisma.FileCreateInput, 'id' | 'status'>;
type SuccessOutput = { prediction: PredictionRequest; error: null };
type ErrorOutput = { prediction: null; error: string };
type Output = SuccessOutput | ErrorOutput;

type TranscriptorEngine = {
	createAudioTranscription: (audioUrl: string) => Promise<Output>;
	handleWebhookEvent: (prediction: any) => Promise<void>;
	validateWebhook: (req: Request) => Promise<boolean>;
	predictionWebHookData: Prediction;
};

const getTranscriptor = (engine: 'AssemblyAi' | 'Replicate'): TranscriptorEngine => {
	return {
		AssemblyAi: AssemblyAiEngine,
		Replicate: ReplicateEngine,
	}[engine];
};

export type { SuccessOutput, ErrorOutput, Output, TranscriptorEngine, PredictionRequest };
export { getTranscriptor };
