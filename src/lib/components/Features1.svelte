<script lang="ts">
	import config from '$lib/config';

	import DecorationLeft from '$lib/decorations/DecorationLeft.svelte';

	import H2 from '$lib/atoms/H2.svelte';
	import Link from '$lib/atoms/Link.svelte';
	import Paragraph from '$lib/atoms/Paragraph.svelte';

	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import ServerIcon from '$lib/icons/ServerIcon.svelte';
	import SparklesIcon from '$lib/icons/SparklesIcon.svelte';
	import WorldIcon from '$lib/icons/WorldIcon.svelte';

	type IconType = typeof SearchIcon | typeof SparklesIcon | typeof ServerIcon | typeof WorldIcon;

	const icons: Record<string, IconType> = {
		feature1: SparklesIcon,
		feature2: WorldIcon,
		feature3: SearchIcon,
		feature4: ServerIcon,
	};

	const features = [
		{
			title: 'AI applications',
			icon: 'feature1',
			description:
				'With a dedicated rich type for embeddings, built-in vector similarity search and a native OpenAI integration, Xata makes it very easy to add AI capabilities to your app.',
		},
		{
			title: 'Web apps',
			icon: 'feature2',
			description:
				'Whether you write your web app in Python, TypeScript, or JavaScript, you’ll enjoy the best database developer experience. It also comes with built-in support images and attachments.',
		},
		{
			title: 'Search',
			icon: 'feature3',
			description:
				'Data from Postgres is automatically replicated to Elasticsearch, the world’s most advanced search engine. The Xata search API makes it very easy to fine tune your app search.',
		},
		{
			title: 'Serverless apps',
			icon: 'feature4',
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

	<div class="relative mx-auto mb-12 grid max-w-screen-xl grid-cols-2 gap-x-16 gap-y-20 px-8">
		{#each features as feature}
			<div class="flex gap-8">
				<div
					class="flex aspect-square size-16 items-center justify-center rounded-md bg-primary text-neutral-200"
				>
					<svelte:component this={icons[feature.icon]} />
				</div>
				<div>
					<h3 class="mb-4 text-3xl font-semibold text-neutral-100">{feature.title}</h3>
					<p class="pb-4">{feature.description}</p>
					<Link href="no where" title="Learn More" />
				</div>
			</div>
		{/each}
	</div>
</section>
