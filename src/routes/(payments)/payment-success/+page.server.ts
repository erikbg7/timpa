import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageServerLoad = async ({ url, locals: { stripe, supabase } }) => {
	const sessionId = url.searchParams.get('session_id');
	console.log({ sessionId });
	const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items'],
	});

	if (stripeSession.payment_status === 'paid') {
		// const customerEmail = stripeSession.customer_details.email;
		// const { data, error } = await supabase.auth.signInWithOtp({
		// 	email: customerEmail,
		// 	options: {
		// 		// set this to false if you do not want the user to be automatically signed up
		// 		shouldCreateUser: true,
		// 		emailRedirectTo: 'http://localhost:5173/',
		// 	},
		// });
		// redirect(303, `/confirm-session?email=${encodeURIComponent(customerEmail)}`);
	}

	return { url: '' };
};
