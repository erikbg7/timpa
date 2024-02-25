<script lang="ts">
	import H2 from '$lib/atoms/H2.svelte';
	import Paragraph from '$lib/atoms/Paragraph.svelte';

	export let title: string;
	export let description: string;
</script>

<!-- If you want a look and feel more similar to https://calendly.com/features 
where each sectionhas a h6 title, just enable the h6 tag -->

<div class="mx-auto mb-16 max-w-4xl text-center text-neutral-500 dark:text-neutral-400">
	<!-- <H6 title="Pricing" /> -->
	<H2 {title} size="lg" className="w-fit mx-auto" />
	<Paragraph title={description} />
</div>
