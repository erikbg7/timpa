<script>
	import H2 from '$lib/components/H2.svelte';
	import H6 from '$lib/components/H6.svelte';
	import Link from '$lib/components/Link.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Paragraph from '$lib/components/Paragraph.svelte';
	import config from '$lib/config';
	import clsx from 'clsx';

	const FEATURES = [
		{
			image: '/landing/image1.webp',
			subtitle: 'One centralized location',
			title: 'Admin Management',
			description:
				'Easily manage your organization’s users and scheduling processes from one centralized place.',
		},
		{
			image: '/landing/image2.webp',
			subtitle: 'You can depend on us',
			title: 'Security & Compliance',
			description:
				'Trust Calendly to safeguard company data and meet your compliance requirements.',
		},
		{
			image: '/landing/image3.webp',
			subtitle: `Standarize on ${config.appName}`,
			title: 'Designed for your whole organization',
			description:
				'With Calendly commonly used to power meetings with prospects, customers, recruits and more, it’s ideal to power scheduling for your whole company with meeting analytics, and enterprise-ready admin, security, and IT-oriented features.',
		},
	];
</script>

<main
	class="relative mx-auto flex min-h-screen max-w-screen-xl flex-col justify-center overflow-hidden px-8 py-16"
>
	<Pricing />

	<div class="mx-auto max-w-2xl text-center">
		<H6 title={`${config.appName} for enterprise`} />
		<H2 title="Powering prospect meetings for the Fortune 500" size="xl" />
	</div>

	{#each FEATURES as feature, index}
		<div class={clsx('mt-20 flex items-center', index % 2 !== 0 && 'flex-row-reverse')}>
			<div class="w-1/2">
				<div class={clsx('flex flex-col', index % 2 !== 0 ? 'pl-24' : 'pr-24')}>
					<H6 title={feature.subtitle} />
					<H2 title={feature.title} size="lg" />
					<Paragraph title={feature.description} />
					<Link innerLink href="/" title="Learn more" />
				</div>
			</div>
			<div class="w-1/2">
				<img src={feature.image} alt={feature.title} class="max-h-[500px]" />
			</div>
		</div>
	{/each}
</main>
