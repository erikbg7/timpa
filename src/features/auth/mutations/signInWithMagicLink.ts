import type { MySupabaseClient } from '$lib/supabase';

type SignInWithMagicLinkArgs = { email: string };

const signInWithMagicLink =
	(supabase: MySupabaseClient) =>
	async ({ email }: SignInWithMagicLinkArgs) => {
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: true,
				emailRedirectTo: 'http://localhost:5173/',
			},
		});
		if (error) {
			throw error;
		}
	};

export { signInWithMagicLink };
