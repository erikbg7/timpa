import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ depends, url, locals }) => {
	depends('supabase:auth');
	const session = await locals.getSession();

	if (session) {
		// if not logged, return them to the account page
		throw redirect(303, '/dashboard');
	}

	return { url: url.origin };
};

export const actions = {
	createCheckoutSession: async (event) => {
		const formData = await event.request.formData();
		const priceId = formData.get('priceId') as string;

		// If we require the user to be logged before paying, we can redirect to signIn here
		const session = await event.locals.getSession();
		const email = session?.user.email;

		const cancelUrl = !!email ? `/dashboard` : `/cancel`;
		const successUrl = !!email ? `/dashboard` : `/payment-success?session_id={CHECKOUT_SESSION_ID}`;

		// If the user is looged we append the email, otherwise we don't
		const stripeSession = await event.locals.stripe.checkout.sessions.create({
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
		});

		if (!stripeSession.url) throw new Error('Failed to create checkout session');

		return redirect(303, stripeSession.url);
	},
};
