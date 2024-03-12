import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import type { Database } from '../../types/supabase';

export const supabase = createClient(
	env.SUPABASE_PROJECT_URL as string,
	env.SUPABASE_SERVICE_KEY as string,
);

export type MySupabaseClient = SupabaseClient<Database>;
