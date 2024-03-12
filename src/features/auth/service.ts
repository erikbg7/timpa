import type { MySupabaseClient } from '$lib/supabase';
import { getSession } from './queries/getSession';
import { signOut } from './mutations/signOut';
import { signInWithMagicLink } from './mutations/signInWithMagicLink';
import { signInWithProvider } from './mutations/signInWithProvider';

type AuthService = ReturnType<typeof createAuthService>;

const createAuthService = (supabase: MySupabaseClient) => {
	return {
		queries: {
			getSession: getSession(supabase),
			getStorageKey: () => supabase.storageKey,
		},
		mutations: {
			signOut: signOut(supabase),
			signInWithMagicLink: signInWithMagicLink(supabase),
			signInWithProvider: signInWithProvider(supabase),
		},
	};
};

export type { AuthService };
export { createAuthService };
