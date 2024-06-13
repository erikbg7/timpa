import type { Prediction } from 'replicate';

const mockId = 'w7mfhhpgjsrg80cg09kb3rzd33';

export const predictionMock: Prediction = {
	id: mockId,
	model: 'openai/whisper',
	version: '4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2',
	source: 'api',
	input: {
		audio:
			'https://xmlhydweyaitfxmkrwag.supabase.co/storage/v1/object/sign/files/47cb63e0-6bc8-4683-ab56-b897be878f24/1718027208430.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy80N2NiNjNlMC02YmM4LTQ2ODMtYWI1Ni1iODk3YmU4NzhmMjQvMTcxODAyNzIwODQzMC5tcDMiLCJpYXQiOjE3MTgwMjcyMTAsImV4cCI6MTcxODAyNzgxMH0.c0oRhBsjtTYqkFnZwcRlg4iitxjm_Iula3nr2sLUaKw',
		compression_ratio_threshold: 2.4,
		condition_on_previous_text: true,
		logprob_threshold: -1,
		model: 'large-v3',
		no_speech_threshold: 0.6,
		suppress_tokens: '-1',
		temperature: 0,
		temperature_increment_on_fallback: 0.2,
		transcription: 'plain text',
		translate: false,
	},
	logs: '',
	output: null,
	error: null,
	status: 'starting',
	created_at: '2024-06-10T13:46:50.902Z',
	webhook: 'https://3ae9-185-253-144-45.ngrok-free.app/api/prediction-webhook',
	webhook_events_filter: ['completed'],
	urls: {
		cancel: 'https://api.replicate.com/v1/predictions/w7mfhhpgjsrg80cg09kb3rzd30/cancel',
		get: 'https://api.replicate.com/v1/predictions/w7mfhhpgjsrg80cg09kb3rzd30',
	},
};

// this is what we receive in the body of the webhook
export const predictionWebHookData: Prediction = {
	id: mockId,
	completed_at: '2024-06-10T13:47:30.935655Z',
	created_at: '2024-06-10T13:46:50.902Z',
	error: null,
	source: 'api',
	input: {
		audio:
			'https://xmlhydweyaitfxmkrwag.supabase.co/storage/v1/object/sign/files/47cb63e0-6bc8-4683-ab56-b897be878f24/1718027208430.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy80N2NiNjNlMC02YmM4LTQ2ODMtYWI1Ni1iODk3YmU4NzhmMjQvMTcxODAyNzIwODQzMC5tcDMiLCJpYXQiOjE3MTgwMjcyMTAsImV4cCI6MTcxODAyNzgxMH0.c0oRhBsjtTYqkFnZwcRlg4iitxjm_Iula3nr2sLUaKw',
		compression_ratio_threshold: 2.4,
		condition_on_previous_text: true,
		logprob_threshold: -1,
		model: 'large-v3',
		no_speech_threshold: 0.6,
		suppress_tokens: '-1',
		temperature: 0,
		temperature_increment_on_fallback: 0.2,
		transcription: 'plain text',
		translate: false,
	},
	logs:
		'Transcribe with large-v3 model.\n' +
		'Detected language: Catalan\n' +
		'  0%|          | 0/1155 [00:00<?, ?frames/s]\n' +
		'100%|██████████| 1155/1155 [00:03<00:00, 349.56frames/s]\n' +
		'100%|██████████| 1155/1155 [00:03<00:00, 349.53frames/s]\n',
	metrics: { predict_time: 5.332407 },
	model: 'openai/whisper',
	output: {
		detected_language: 'catalan',
		segments: [
			/**things here */
		],
		transcription:
			" En exercici del legítim dret a l'autodeterminació que té una nació mil·lenària com Catalunya, a un referèndum que se celebra",
		translation: null,
	},
	started_at: '2024-06-10T13:47:25.603248Z',
	status: 'succeeded',
	urls: {
		cancel: 'https://api.replicate.com/v1/predictions/w7mfhhpgjsrg80cg09kb3rzd30/cancel',
		get: 'https://api.replicate.com/v1/predictions/w7mfhhpgjsrg80cg09kb3rzd30',
	},
	version: '4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2',
	webhook: 'https://3ae9-185-253-144-45.ngrok-free.app/api/prediction-webhook',
	webhook_events_filter: ['completed'],
};
