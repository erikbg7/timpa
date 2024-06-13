// The Replicate webhook is a POST request where the request body is a prediction object.
// Identical webhooks can be sent multiple times, so this handler must be idempotent.

import { REPLICATE_WEBHOOK_SIGNING_KEY } from '$env/static/private';
import { validateWebhook, type Prediction } from 'replicate';
import { json } from '@sveltejs/kit';
import { handleWebhookEvent } from '$lib/transcriptor.js';
import logger from '$lib/logger';

export async function POST(event) {
	const isValid = await validateWebhook(event.request.clone(), REPLICATE_WEBHOOK_SIGNING_KEY);

	if (!isValid) {
		// TODO: validation failed, set prediction as failed
		// we always have to return 200 responses to webhook, otherwise it will keep retrying
		logger.error('Invalid webhook request validation', event);
		return json(200);
	}

	const predictionData: Prediction = await event.request.json();
	await handleWebhookEvent(predictionData);
	return json(200);
}
