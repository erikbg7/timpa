import { workspaces } from './lib/stores/workspaces';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import type { Stripe } from 'stripe';
import type { ICustomer } from '$lib/types';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		interface Locals {
			stripe: Stripe;
			prisma: PrismaClient;
			supabase: SupabaseClient<Database>;
			getSession: () => Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
			props?: {
				session: Session;
				customer: ICustomer | null;
				isCustomer: boolean;
			};
		}

		// https://kit.svelte.dev/docs/errors#type-safety
		// interface Error {
		// 	id: string;
		// 	code: string;
		// }
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
