import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = await event.locals.getSession();

	// if the user is already logged in return him to the home page
	if (session) {
		throw redirect(303, '/');
	}
}
