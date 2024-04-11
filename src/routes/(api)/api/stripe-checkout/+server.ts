import { PUBLIC_BASE_URL } from '$env/static/public';
import { fail, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async (event) => {
	const {
		locals: { stripe, getSession },
	} = event;

	try {
		const formData = await event.request.formData();

		const type = formData.get('type');
		const priceId = formData.get('priceId');

		// If we require the user to be logged before paying, we can redirect to signIn here
		const session = await getSession();
		const email = session?.user.email;

		const cancelUrl = !!email ? `/dashboard` : `/cancel`;
		const successUrl = !!email ? `/dashboard` : `/payment-success?session_id={CHECKOUT_SESSION_ID}`;

		// If the user is looged we append the email, otherwise we don't
		const stripeSession = await stripe.checkout.sessions.create({
			mode: 'payment',
			customer_email: email,
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			cancel_url: PUBLIC_BASE_URL.concat(cancelUrl),
			success_url: PUBLIC_BASE_URL.concat(successUrl),
			metadata: {
				type: type,
			},
		});

		return json({ url: stripeSession.url });
	} catch (e) {
		console.error('[STRIPE ERROR]: ', e);
		fail(500, { message: 'WebHook Error' });
	}
};
