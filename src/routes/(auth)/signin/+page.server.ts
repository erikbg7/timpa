import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ locals: { getSession, supabase } }) {
	const session = await getSession();
	// if the user is already logged in return him to the home page
	if (session) {
		throw redirect(303, '/');
	}
}

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const emailSchema = z.string().email();

		let result = {} as any;

		try {
			emailSchema.parse(email);

			result = await event.locals.supabase.auth.signInWithOtp({
				email: email,
				options: {
					// set this to false if you do not want the user to be automatically signed up
					shouldCreateUser: true,
					emailRedirectTo: 'http://localhost:5173/',
				},
			});

			console.log('[SVELTE SAAS]: Success login');
		} catch (error) {
			console.log('[SVELTE SAAS]: ', error);
			return fail(400, { errors: { email: 'Please enter a valid email address' } });
		}

		return result?.error
			? fail(400, { errors: JSON.stringify(result.error) })
			: redirect(303, `/confirm-session?email=${encodeURIComponent(email)}`);
	},
	logout: async ({ locals }) => {
		const { error } = await locals.supabase.auth.signOut();
		if (error) {
			console.log('[SVELTE SAAS]: ', error);
		}
		throw redirect(303, '/');
	},
};
