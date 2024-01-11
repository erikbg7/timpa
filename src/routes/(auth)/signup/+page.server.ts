import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export async function load({ locals: { getSession } }) {
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

		if (!email) {
			throw redirect(303, `/chat/${email}`);
		}

		const { data, error } = await event.locals.supabase.auth.signInWithOtp({
			email: email,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: true,
				emailRedirectTo: 'http://localhost:5173/',
			},
		});

		console.log({ data, error });

		throw redirect(303, `/confirm-session?email=${encodeURIComponent(email)}`);
	},
	logout: async ({ locals }) => {
		const { error } = await locals.supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		throw redirect(303, '/');
	},
};
