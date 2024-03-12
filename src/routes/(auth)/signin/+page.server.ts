import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signInWithMagicLink: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;

		try {
			const emailSchema = z.string().email();
			emailSchema.parse(email);

			await event.locals.auth.mutations.signInWithMagicLink({ email });
		} catch (error) {
			console.log('[SVELTE SAAS ERROR]: ', error);
			return fail(400, { errors: { email: 'Please enter a valid email address' } });
		}
		redirect(303, `/confirm-session?email=${encodeURIComponent(email)}`);
	},
	signInWithProvider: async (event) => {
		let url;
		try {
			const formData = await event.request.formData();
			const provider = formData.get('provider') as 'github' | 'google';

			const data = await event.locals.auth.mutations.signInWithProvider({ provider });
			url = data.url;
		} catch (error) {
			console.log('[SVELTE SAAS ERROR]: ', error);
			fail(400, { errors: { provider: 'Invalid provider' } });
		}
		redirect(303, url!);
	},
	signOut: async ({ locals }) => {
		try {
			await locals.auth.mutations.signOut();
		} catch (error) {
			console.log('[SVELTE SAAS ERROR]: ', error);
		}

		throw redirect(303, '/');
	},
};
