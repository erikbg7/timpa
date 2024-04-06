// import { redirect } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';

// TODO: figure out how to fix this error
// Change to prerender false, ssr true to fix
// Cannot use `cookies.set(...)` after the response has been generated
export const prerender = true;
export const ssr = false;

// Note: We can disable this redirect for now, we use callback api route to
// redirect the user to the dashboard after they login

// export const load: PageServerLoad = async ({ depends, url, locals }) => {
// 	depends('supabase:auth');
// 	const session = await locals.getSession();

// 	if (session) {
// 		// if not logged, return them to the account page
// 		throw redirect(303, '/dashboard');
// 	}

// 	return { url: url.origin };
// };
