import type { MySupabaseClient } from '$lib/supabase';

const signOut = (supabase: MySupabaseClient) => async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw error;
	}
};

export { signOut };
