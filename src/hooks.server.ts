import type { Database } from './../types/supabase';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_KEY } from '$env/static/private';
import { stripe } from '$lib/stripe';
import { createServerClient } from '@supabase/ssr';

export const handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			},
		},
	});

	event.locals.stripe = stripe;

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		let {
			data: { session },
		} = await event.locals.supabase?.auth?.getSession();

		// solving the case if the user was deleted from the database but the browser still has a cookie/loggedin user
		// +lauout.server.js will delete the cookie if the session is null
		const { data: getUserData, error: err } = await event.locals.supabase.auth.getUser();
		if (getUserData.user == null) {
			session = null;
		}

		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		},
	});
};
