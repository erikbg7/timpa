<script>
	import config from '$lib/config';
	import testimonials from '$lib/testimonials';

	import H2 from './H2.svelte';
	import H3 from './H3.svelte';
	import Paragraph from './Paragraph.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import DecorationLeft from '$lib/decorations/DecorationLeft.svelte';
	import Link from './Link.svelte';

	const features = [
		{
			title: 'AI applications',
			description:
				'With a dedicated rich type for embeddings, built-in vector similarity search and a native OpenAI integration, Xata makes it very easy to add AI capabilities to your app.',
		},
		{
			title: 'Web apps',
			description:
				'Whether you write your web app in Python, TypeScript, or JavaScript, you’ll enjoy the best database developer experience. It also comes with built-in support images and attachments.',
		},
		{
			title: 'Search',
			description:
				'Data from Postgres is automatically replicated to Elasticsearch, the world’s most advanced search engine. The Xata search API makes it very easy to fine tune your app search.',
		},
		{
			title: 'Serverless apps',
			description:
				'The Data API, the edge-ready TypeScript SDK, the Vercel, Netlify, and CloudFlare integrations make Xata a pleasure to use together with any serverless platform.',
		},
	];
</script>

<section class="relative">
	<DecorationLeft top="0rem" />

	<div class="mx-auto mb-20 max-w-4xl text-center text-neutral-500 dark:text-neutral-400">
		<H2 size="lg">Is Xata right for my use case?</H2>
		<Paragraph
			title="{config.appName} uses the best tools for the job, extending your Postgres database to support more use cases. Here are some popular use cases among our customers."
		/>
	</div>

	<div class="relative mx-auto mb-12 grid max-w-screen-xl grid-cols-2 gap-16 px-8">
		{#each features as feature}
			<div class="flex gap-8">
				<div class="aspect-square size-16 rounded-md bg-primary"></div>
				<div>
					<h3 class="mb-4 text-3xl font-semibold text-neutral-100">{feature.title}</h3>
					<p class="pb-4">{feature.description}</p>
					<Link href="no where" title="Learn More" />
				</div>
			</div>
		{/each}
	</div>
</section>
