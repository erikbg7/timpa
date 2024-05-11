<script lang="ts">
	import config from '$config';
	// import Link from '$lib/atoms/Link.svelte';
	import DecorationLeft from '$lib/decorations/DecorationLeft.svelte';

	import SectionHeader from './SectionHeader.svelte';

	const features = config.features1.list;
</script>

<section id="product" class="relative">
	<DecorationLeft top="0rem" />

	<SectionHeader title={config.features1.title} description={config.features1.description} />

	<div
		class="relative mx-auto mb-0 grid max-w-screen-xl grid-cols-1 gap-x-16 gap-y-20 px-4 md:mb-12 md:grid-cols-2 md:px-8"
	>
		{#each features as feature}
			<div class="flex gap-8">
				<div
					class="flex aspect-square size-16 items-center justify-center rounded-md bg-primary text-neutral-200"
				>
					<svelte:component this={feature.icon} />
				</div>
				<div>
					<h3 class="mb-4 text-3xl font-semibold text-neutral-100">{feature.title}</h3>
					<p class="pb-4">{feature.description}</p>
					<!-- <Link href="no where" title="Learn More" /> -->
				</div>
			</div>
		{/each}
	</div>
</section>
