import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_BASE_URL } from '$env/static/public';
export const load: PageServerLoad = async ({ depends, url, locals: { auth } }) => {
	depends('supabase:auth');
	const session = await auth.queries.getSession();

	// if the user is already logged in return them to the account page
	if (session) {
		throw redirect(303, '/dashboard');
	}

	return { url: url.origin };
};

export const actions = {
	createCheckoutSession: async (event) => {
		const { request, locals } = event;
		let url = '';
		try {
			const formData = await request.formData();
			const priceId = formData.get('priceId') as string;

			const session = await locals.auth.queries.getSession();
			const email = session?.user.email;

			// If we require the user to be logged before paying, we can redirect to signIn here

			const cancelUrl = !!session ? `${PUBLIC_BASE_URL}/dashboard` : `${PUBLIC_BASE_URL}/cancel`;
			const successUrl = !!session
				? `${PUBLIC_BASE_URL}/dashboard`
				: `${PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`;

			const config = { priceId, email, cancelUrl, successUrl };
			const data = await locals.payments.mutations.createCheckoutSession(config);
			url = data.url;
		} catch (error) {
			console.log('[SVELTE SAAS ERROR]: ', error);
			fail(500, { error: 'Failed to create checkout session' });
		}

		redirect(303, url);
	},
};
