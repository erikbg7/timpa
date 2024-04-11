import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { isValidEmail, isValidProvider } from '$lib/validations';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const actions: Actions = {
	signInWithMagicLink: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;

		if (!isValidEmail(email)) {
			return fail(400, { errors: { email: 'Invalid email' } });
		}

		const { error } = await event.locals.supabase.auth.signInWithOtp({
			email,
			// set this to false if you do not want the user to be automatically signed up
			options: { shouldCreateUser: true, emailRedirectTo: PUBLIC_BASE_URL },
		});

		if (error) {
			fail(400, { errors: { email: error.message } });
		}

		redirect(303, `/confirm-session?email=${encodeURIComponent(email)}`);
	},
	signInWithProvider: async (event) => {
		const formData = await event.request.formData();
		const provider = formData.get('provider') as 'github' | 'google';

		if (!isValidProvider) {
			return fail(400, { errors: { provider: 'Invalid provider' } });
		}

		const { data, error } = await event.locals.supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${PUBLIC_BASE_URL}/api/auth-callback?next=/dashboard`,
			},
		});

		if (error) {
			return fail(400, { errors: { provider: error.message } });
		}

		redirect(303, data.url!);
	},
	signOut: async ({ locals }) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/');
	},
};
