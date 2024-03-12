import type { MySupabaseClient } from '$lib/supabase';

type SignInWitProviderArgs = { provider: 'github' | 'google' };

const signInWithProvider =
	(supabase: MySupabaseClient) =>
	async ({ provider }: SignInWitProviderArgs) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			// options: { redirectTo: 'http://localhost:5173/dashboard' },
		});

		if (error) {
			throw error;
		}

		if (!data.url) {
			throw new Error('No redirect URL');
		}

		return { url: data.url };
	};

export { signInWithProvider };
