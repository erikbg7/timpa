<script lang="ts">
	import config from '$config';
	import SectionHeader from './SectionHeader.svelte';

	const faqs = config.faqs.list;
</script>

<section id="faqs">
	<SectionHeader title={config.faqs.title} description={config.faqs.description} />

	<div class="mx-auto my-0 max-w-4xl px-4 md:px-8">
		{#each faqs as item}
			<div class="flex">
				<div class="collapse collapse-arrow rounded-none border-b border-zinc-400 bg-base-200">
					<input type="checkbox" aria-checked="false" aria-label="Toggle Frequently Add Question" />
					<div class="collapse-title text-lg font-medium">{item.question}</div>
					<div class="collapse-content text-neutral-400">
						{@html item.answer}
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
