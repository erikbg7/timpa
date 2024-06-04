import type { Plan, PricingPlan } from '$lib/enums';

export type AuthMode = 'signin' | 'signup' | 'magiclink';
export type AuthConfig = Record<AuthMode, { title: string; subtitle: string; seoTitle: string }>;
export type AuthProviders = 'github' | 'google';
export type AuthProviderConfig = { id: AuthProviders; title: string; primary: boolean };

export type PlanConfig = {
	type: PricingPlan;
	priceId: string; // Create the plans in your Stripe dashboard and add here the priceId
	name: string;
	description: string; // Tip: explain why this plan and not others
	isFeatured?: boolean; // Featured plan will be highlighted
	price: number;
	priceAnchor?: number;
	features: { name: string }[];
};

export type Config = {
	appName: string;
	auth: {
		texts: AuthConfig;
		providers: AuthProviderConfig[];
	};
	footer: {
		socials: { icon: string; ariaLabel: string; link: string }[];
	};

	pricing: {
		title: string;
		description: string;
		plans: {
			[Plan.STANDARD]: PlanConfig;
			[Plan.PRO]: PlanConfig;
		};
	};
	navbar: {
		list: { label: string; href: string }[];
	};
	features1: any;
	testimonials: any;
	faqs: any;
	website: Record<string, string>;
};
