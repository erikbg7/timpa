import { stripe } from '$lib/stripe';

type CreateCheckoutSessionArgs = {
	email: string | undefined;
	priceId: string;
	successUrl: string;
	cancelUrl: string;
};

type CreateCheckoutSession = (args: CreateCheckoutSessionArgs) => Promise<{ url: string }>;

const createCheckoutSession: CreateCheckoutSession = async ({
	priceId,
	email,
	successUrl,
	cancelUrl,
}) => {
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
		success_url: successUrl,
		cancel_url: cancelUrl,
	});

	if (!stripeSession.url) throw new Error('Failed to create checkout session');

	return { url: stripeSession.url };
};

export { createCheckoutSession };
