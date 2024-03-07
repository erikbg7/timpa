import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types.js';

export const load = ({ params, url }: PageServerLoadEvent) => {
	console.log({ params, url });
	const email = url.searchParams.get('email');

	if (!email) {
		throw redirect(303, `/signin`);
	}

	return { email: decodeURIComponent(email) };
};
