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
};

export default config;
