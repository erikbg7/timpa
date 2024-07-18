// The Replicate webhook is a POST request where the request body is a prediction object.
// Identical webhooks can be sent multiple times, so this handler must be idempotent.

import { json } from '@sveltejs/kit';
import logger from '$lib/logger';
import { getTranscriptor } from '$lib/transcriptor/index.js';

export async function POST(event) {
	const request = await event.request.clone();
	const body = await event.request.json();

	const transcriptor = getTranscriptor('AssemblyAi');
	const isValid = await transcriptor.validateWebhook(request);

	if (!isValid) {
		// TODO: validation failed, set prediction as failed
		// we always have to return 200 responses to webhook, otherwise it will keep retrying
		logger.error('Invalid webhook request validation', event);
		return json(200);
	}

	await transcriptor.handleWebhookEvent(body);
	return json(200);
}
