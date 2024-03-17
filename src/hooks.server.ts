import Stripe from 'stripe';
import prisma from '$lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { STRIPE_SECRET_KEY, SUPABASE_SERVICE_KEY } from '$env/static/private';
import type { Database } from './../types/supabase';

export const handle = async ({ event, resolve }) => {
	event.locals.stripe = new Stripe(STRIPE_SECRET_KEY, {
		// https://github.com/stripe/stripe-node#configuration
		apiVersion: '2023-10-16',
	});

	event.locals.prisma = prisma;

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

	event.locals.getSession = async () => {
		let {
			data: { session },
		} = await event.locals.supabase?.auth?.getSession();

		// solving the case if the user was deleted from the database but the browser still has a cookie/loggedin user
		// +layout.server.js will delete the cookie if the session is null
		const { data: getUserData } = await event.locals.supabase.auth.getUser();

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
