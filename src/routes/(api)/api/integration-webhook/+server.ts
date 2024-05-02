import { fail, json } from '@sveltejs/kit';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { isValidEmail } from '$lib/validations/index.js';
import type { Plan } from '$lib/enums';
import prisma from '$lib/prisma';
import Jimp from 'jimp';

async function calculateSnapshotDiff(a: string, b: string) {
	const imageBaselineData = a.split(',').pop();
	const imageBaseline = await Jimp.read(Buffer.from(imageBaselineData, 'base64'));
	const imageCurrentData = b.split(',').pop();
	const imageCurrent = await Jimp.read(Buffer.from(imageCurrentData, 'base64'));
	return calculateScreenshotDiff(imageBaseline.bitmap, imageCurrent.bitmap);
}

function calculateScreenshotDiff(a: ImageData | any, b: ImageData | any) {
	let diff = [];
	if (a.data.length !== b.data.length) {
		throw new Error('Images are not the same size');
	}

	for (let i = 0; i < a.data.length; i += 4) {
		const r1 = a.data[i];
		const g1 = a.data[i + 1];
		const b1 = a.data[i + 2];
		const a1 = a.data[i + 3];

		const r2 = b.data[i];
		const g2 = b.data[i + 1];
		const b2 = b.data[i + 2];
		const a2 = b.data[i + 3];

		if (r1 !== r2 || g1 !== g2 || b1 !== b2 || a1 !== a2) {
			diff.push(Math.round(i / 4));
		}
	}

	return diff;
}

/** @type {import('./$types').RequestHandler} */
export const POST = async (event) => {
	const {
		locals: { stripe, getSession },
	} = event;

	try {
		// verify token
		// const payload = await event.request.text();
		// const signature = event.request.headers.get('stripe-signature')!;
		// const stripeEvent = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);

		// const { data, type } = stripeEvent;

		const data = await event.request.json();
		const { type } = data;

		switch (type) {
			case 'snapshot.full.example': {
				const { workspaceId, runName, name, baselineContent, snapshotContent } = data;

				const diff = await calculateScreenshotDiff(baselineContent, snapshotContent);

				const baselineSnapshot = await prisma.referenceScreenshot.create({
					data: { workspaceId, name, content: baselineContent },
				});

				const run = await prisma.run.create({
					data: {
						workspaceId,
						screenshots: {
							create: {
								name,
								diff,
								content: snapshotContent,
							},
						},
					},
				});

				break;
			}
			case 'snapshot.run.new': {
				const referenceSnapshot = await prisma.referenceScreenshot.findFirst({
					where: {
						name: data.name,
					},
				});

				if (!referenceSnapshot) {
					console.log('create reference snapshot');
					const referenceSnapshot = await prisma.referenceScreenshot.create({
						data: {
							name: data.name,
							content: data.content,
							workspaceId: data.workspaceId,
						},
					});
				} else {
					console.log('create new snapshot');
					const diff = await calculateSnapshotDiff(referenceSnapshot.content, data.content);

					const snapshot = await prisma.screenshot.create({
						data: {
							runId: data.runId,
							name: data.name,
							content: data.content,
							diff,
						},
					});
				}

				break;
			}

			case 'screenshot.reference.set': {
				const { workspaceId, runId, name, content } = data;

				const referenceScreenshot = await prisma.referenceScreenshot.create({
					data: {
						workspaceId,
						name,
						content,
					},
				});

				// const checkoutSession = data.object!;

				// const status = checkoutSession.payment_status;
				// if (status !== 'paid') {
				// 	fail(400, { message: 'Payment not completed' });
				// }

				// const session = await getSession();
				// const sessionEmail = session?.user?.email;
				// const checkoutEmail = checkoutSession.customer_details?.email;

				// const plan = checkoutSession.metadata?.type as Plan;
				// const email = sessionEmail || (checkoutEmail as string);
				// if (!isValidEmail(email)) {
				// 	fail(500, { message: 'No email found' });
				// }

				// const customer = await prisma.customer.upsert({
				// 	where: { email },
				// 	update: {},
				// 	create: { email, plan },
				// });

				// if (!customer) fail(500, { message: 'Error creating user' });

				break;
			}

			case 'customer.subscription.updated': {
				// The customer might have changed the plan (higher or lower plan, cancel soon etc...)
				// const subscription = await stripe.subscriptions.retrieve(data.object.id);
				// const planId = subscription?.items?.data[0]?.price?.id;
				// Do any operation here
				break;
			}

			case 'customer.subscription.deleted': {
				// The customer stopped the subscription.
				// Do any operation here
				break;
			}

			default:
			// Unhandled event type
		}
	} catch (e) {
		fail(500, { message: 'WebHook Error' });
		console.error('[STRIPE ERROR]: ', e);
	}

	return json(200);
};
