import type { Session } from '@supabase/supabase-js';
import type { MySupabaseClient } from '$lib/supabase';

const getSession = (supabase: MySupabaseClient) => async (): Promise<Session | null> => {
	let {
		data: { session },
	} = await supabase?.auth?.getSession();

	// solving the case if the user was deleted from the database but the browser still has a cookie/loggedin user
	// +layout.server.js will delete the cookie if the session is null
	const { data: getUserData, error: err } = await supabase.auth.getUser();

	if (getUserData.user == null) {
		session = null;
	}

	return session;
};

export { getSession };
