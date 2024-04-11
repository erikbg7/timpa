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

	/**
	 * Unlike `supabase.auth.getSession`, which is unsafe on the server because it
	 * doesn't validate the JWT, this function validates the JWT by first calling
	 * `getUser` and aborts early if the JWT signature is invalid.
	 */
	event.locals.getSession = async () => {
		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return null;
		}

		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		},
	});
};
