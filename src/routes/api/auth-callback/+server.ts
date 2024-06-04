import { redirect } from '@sveltejs/kit';

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export async function GET(event) {
	const { searchParams, origin } = new URL(event.url);

	const code = searchParams.get('code');
	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get('next') ?? '/';

	if (code) {
		const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			cookies: {
				get(name: string) {
					return event.cookies.get(name);
				},
				set(name: string, value: string, options: CookieOptions) {
					event.cookies.set(name, value, { ...options, path: '/' });
				},
				remove(name: string, options: CookieOptions) {
					event.cookies.delete(name, { ...options, path: '/' });
				},
			},
		});

		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return redirect(303, `${origin}${next}`);
		}
	}

	// return the user to an error page with instructions
	return redirect(303, `${origin}/auth/auth-code-error`);
}

// // This code is currently not being used. It can be used to
// // verify the OTP code sent to the user's email when we sign up
// // using email and pass. Do not need it for Magic Link.

// export const GET = async (event) => {
// 	const {
// 		url,
// 		locals: { supabase },
// 	} = event;
// 	const token_hash = url.searchParams.get('token_hash');
// 	const type = url.searchParams.get('type');
// 	const next = url.searchParams.get('next') ?? '/';

// 	console.log({ token_hash, type, next });

// 	if (token_hash && type) {
// 		const { error } = await supabase.auth.verifyOtp({ token_hash, type });
// 		if (!error) {
// 			throw redirect(303, `/${next.slice(1)}`);
// 		}
// 	}

// 	// return the user to an error page with some instructions
// 	throw redirect(303, '/auth/auth-code-error');
// };
