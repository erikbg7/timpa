import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async (event) => {
	const {
		locals: { stripe, getSession },
	} = event;

	const session = await getSession();
	const { priceId } = await event.request.json();

	const successUrl = !!session
		? `http://localhost:5173/dashboard`
		: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`;

	const cancelUrl = !!session ? `http://localhost:5173/dashboard` : `http://localhost:5173/cancel`;

	// If the user is looged we append the email, otherwise we don't
	const stripeSession = await stripe.checkout.sessions.create({
		mode: 'payment',
		customer_email: session?.user.email,
		payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
		success_url: successUrl,
		cancel_url: cancelUrl,
	});

	return json({ url: stripeSession.url });
};
