import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

export const supabase = createClient(
	env.SUPABASE_PROJECT_URL as string,
	env.SUPABASE_ANON_KEY as string,
);
