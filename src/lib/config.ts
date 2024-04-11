import FAQs from './faqs';
import testimonials from './testimonials';

import SparklesIcon from '$lib/icons/SparklesIcon.svelte';
import SearchIcon from '$lib/icons/SearchIcon.svelte';
import ServerIcon from './icons/ServerIcon.svelte';
import WorldIcon from './icons/WorldIcon.svelte';
import {
	PUBLIC_BASE_URL,
	PUBLIC_CONTACT_EMAIL,
	PUBLIC_GITHUB_PAGE,
	PUBLIC_LINKEDIN_PROFILE,
} from '$env/static/public';
import { Plan, type PricingPlan } from './enums';

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

type Config = {
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
};

const appName = 'Calendly';

const config: Config = {
	appName: appName,
	auth: {
		texts: {
			signin: {
				title: 'Sign in',
				subtitle: `New to ${appName}? <a class="text-accent" href="/signin?mode=signup"> Sign up now </a>`,
				seoTitle: 'Sign in',
			},
			signup: {
				title: 'Get Started',
				subtitle: `${appName} doesn't require a credit card to start. Our free plan works great for hobby projects.`,
				seoTitle: 'Sign up',
			},
			magiclink: {
				title: 'Sign In',
				subtitle: `${appName} will send you an email with a magic link to sign in. No password required.`,
				seoTitle: 'Sign in',
			},
		},
		providers: [
			{ id: 'github', title: 'Continue with Github', primary: true },
			{ id: 'google', title: 'Continue with Google', primary: false },
		],
	},
	footer: {
		socials: [
			{
				icon: 'tiktok',
				ariaLabel: 'Go to Xata TikTok page',
				link: 'https://twitter.com/ErikBG47',
			},
			{
				icon: 'twitter',
				ariaLabel: 'Go to Xata Twitter page',
				link: 'https://twitter.com/ErikBG47',
			},
			{
				icon: 'instagram',
				ariaLabel: 'Go to Xata Instagram page',
				link: 'https://twitter.com/ErikBG47',
			},
			{
				icon: 'linkedin',
				ariaLabel: 'Go to Xata LinkedIn page',
				link: 'https://twitter.com/ErikBG47',
			},
		],
	},
	pricing: {
		title: 'Pick the perfect plan for your team',
		description: 'We offer a 14-day free trial. No credit card required.',
		plans: {
			[Plan.STANDARD]: {
				type: Plan.STANDARD,
				priceId:
					process.env.NODE_ENV === 'development' ? 'price_1OsV3LCwovyfOAFP1u90AION' : 'price_456',
				name: Plan.STANDARD,
				description: 'Perfect for small projects',
				price: 79,
				priceAnchor: 99,
				features: [
					{ name: 'NextJS boilerplate' },
					{ name: 'User oauth' },
					{ name: 'Database' },
					{ name: 'Emails' },
				],
			},
			[Plan.PRO]: {
				type: Plan.PRO,
				isFeatured: true,
				priceId:
					process.env.NODE_ENV === 'development' ? 'price_1OsV3LCwovyfOAFP1u90AION' : 'price_456',
				name: Plan.PRO,
				description: 'You need more power',
				price: 99,
				priceAnchor: 149,
				features: [
					{ name: 'NextJS boilerplate' },
					{ name: 'User oauth' },
					{ name: 'Database' },
					{ name: 'Emails' },
					{ name: '1 year of updates' },
					{ name: '24/7 support' },
				],
			},
		},
	},
	testimonials: {
		title: 'Join the Community',
		description: `Join tens of thousands of developers who are working with ${appName} to build better products`,
		list: testimonials,
	},
	faqs: {
		title: 'Frequently Asked Questions',
		description: 'Here are some popular questions among our customers.',
		list: FAQs,
	},
	features1: {
		title: `Is ${appName} right for my use case?`,
		description: `${appName} uses the best tools for the job, extending your Postgres database to support more use cases. Here are some popular use cases among our customers.`,
		list: [
			{
				title: 'AI applications',
				icon: SparklesIcon,
				description:
					'With a dedicated rich type for embeddings, built-in vector similarity search and a native OpenAI integration, Xata makes it very easy to add AI capabilities to your app.',
			},
			{
				title: 'Web apps',
				icon: WorldIcon,
				description:
					'Whether you write your web app in Python, TypeScript, or JavaScript, you’ll enjoy the best database developer experience. It also comes with built-in support images and attachments.',
			},
			{
				title: 'Search',
				icon: SearchIcon,
				description:
					'Data from Postgres is automatically replicated to Elasticsearch, the world’s most advanced search engine. The Xata search API makes it very easy to fine tune your app search.',
			},
			{
				title: 'Serverless apps',
				icon: ServerIcon,
				description:
					'The Data API, the edge-ready TypeScript SDK, the Vercel, Netlify, and CloudFlare integrations make Xata a pleasure to use together with any serverless platform.',
			},
		],
	},
	navbar: {
		list: [
			{ label: 'Product', href: '/#product' },
			{ label: 'Pricing', href: '/#pricing' },
			{ label: 'Testimonials', href: '/#testimonials' },
			{ label: 'FAQs', href: '/#faqs' },
			{ label: 'Blog', href: '/blog' },
			// { label: 'About Us', href: '/about' },
		],
	},
	website: {
		author: 'Erik Blanca',

		ogLanguage: 'en_GB',
		ogImage: '/img/og.jpg',

		siteLanguage: 'en-GB',
		siteTitle: 'Flow Productivity App - Improve Your Results - Get Flow State', // Should take between 20 and 60 characters
		siteKeyWords: 'flow, productivity, timer, study, mindset, improve',
		siteShortTitle: 'Flow Productivity App',
		// Should take around 200 characters
		siteDescription:
			'Your database should be easy to use, not a source of frustration. Xata easily integrates into your developer workflow, providing the best data experience for GitHub, Vercel and Netlify based deployments.',
		siteUrl: PUBLIC_BASE_URL,
		backgroundColor: '#1b4079',
		themeColor: '#d62828',
		contactEmail: PUBLIC_CONTACT_EMAIL,
		// facebookAuthorPage: `https://www.facebook.com/${facebookAuthorPageName}`,
		// facebookAuthorPageName,
		// facebookPage: `https://www.facebook.com/${facebookPageName}`,
		// facebookPageName,
		githubPage: PUBLIC_GITHUB_PAGE,
		linkedinProfile: PUBLIC_LINKEDIN_PROFILE,
		// telegramUsername: PUBLIC_TELEGRAM_USERNAME,
		// tiktokUsername: PUBLIC_TIKTOK_USERNAME,
		// twitterUsername: PUBLIC_TWITTER_USERNAME,
		// twitterUserId: PUBLIC_TWITTER_USER_ID,
		// wireUsername: PUBLIC_WIRE_USERNAME,
	},
};

export default config;
