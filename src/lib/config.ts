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
};

export default config;
