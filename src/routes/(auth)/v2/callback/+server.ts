import { redirect } from '@sveltejs/kit';

// This code is currently not being used. It can be used to
// verify the OTP code sent to the user's email when we sign up
// using email and pass. Do not need it for Magic Link.

export const GET = async (event) => {
	const {
		url,
		locals: { supabase },
	} = event;
	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type');
	const next = url.searchParams.get('next') ?? '/';

	console.log({ token_hash, type, next });

	if (token_hash && type) {
		const { error } = await supabase.auth.verifyOtp({ token_hash, type });
		if (!error) {
			throw redirect(303, `/${next.slice(1)}`);
		}
	}

	// return the user to an error page with some instructions
	throw redirect(303, '/auth/auth-code-error');
};
