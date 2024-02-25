import FAQs from './faqs';
import testimonials from './testimonials';

import SparklesIcon from '$lib/icons/SparklesIcon.svelte';
import SearchIcon from './icons/SearchIcon.svelte';
import ServerIcon from './icons/ServerIcon.svelte';
import WorldIcon from './icons/WorldIcon.svelte';

const appName = 'Calendly';

const config = {
	appName: appName,

	signup: {
		title: 'Create your <span>free</span> account',
		description:
			'Make scheduling with clients and recruits easier with a free Calendly account. First-time signups also receive a free, 14-day trial of our Teams subscription plan!',
		features: [
			'Ability to book meetings as a team with clients and more',
			'Unlimited event types (30-minute video call, 15-minute phone call)',
			'Remove Calendly branding',
			'Ability to charge for meetings with PayPal and Stripe',
		],
	},
	login: {
		title: `Welcome back to <span>${appName}</span>`,
		description: 'Log in to your account to get back to your hub for scheduling meetings.',
	},
	footer: {
		socials: [
			{
				icon: 'tiktok',
				link: '#',
			},
			{
				icon: 'twitter',
				link: '#',
			},
			{
				icon: 'instagram',
				link: '#',
			},
			{
				icon: 'linkedin',
				link: '#',
			},
		],
	},
	pricing: {
		title: 'Pick the perfect plan for your team',
		description: 'We offer a 14-day free trial. No credit card required.',
		// Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
		plans: [
			{
				// REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
				priceId:
					process.env.NODE_ENV === 'development' ? 'price_1Niyy5AxyNprDp7iZIqEyD2h' : 'price_456',
				//  REQUIRED - Name of the plan, displayed on the pricing page
				name: 'Starter',
				// A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
				description: 'Perfect for small projects',
				// The price you want to display, the one user will be charged on Stripe.
				price: 79,
				// If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
				priceAnchor: 99,
				features: [
					{
						name: 'NextJS boilerplate',
					},
					{ name: 'User oauth' },
					{ name: 'Database' },
					{ name: 'Emails' },
				],
			},
			{
				// This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
				isFeatured: true,
				priceId:
					process.env.NODE_ENV === 'development' ? 'price_1Nk4AbAxyNprDp7iXEPBvXju' : 'price_456',
				name: 'Advanced',
				description: 'You need more power',
				price: 99,
				priceAnchor: 149,
				features: [
					{
						name: 'NextJS boilerplate',
					},
					{ name: 'User oauth' },
					{ name: 'Database' },
					{ name: 'Emails' },
					{ name: '1 year of updates' },
					{ name: '24/7 support' },
				],
			},
		],
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
};

export default config;
