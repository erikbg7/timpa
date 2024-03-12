import type { SupabaseClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import type { Stripe } from 'stripe';
import type { AuthService } from '$auth/service';
import type { PaymentsService } from './features/payments/service';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: AuthService;
			payments: PaymentsService;
			supabase: SupabaseClient<Database>;
		}
		interface PageData {
			session: Session | null;
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
