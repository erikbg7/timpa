import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const ssr = false;

export const load: PageServerLoad = async ({ depends, url, locals }) => {
	depends('supabase:auth');
	const session = await locals.getSession();

	if (session) {
		// if not logged, return them to the account page
		throw redirect(303, '/dashboard');
	}

	return { url: url.origin };
};
