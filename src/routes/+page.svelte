<script lang="ts">
	import H2 from '$lib/components/H2.svelte';
	import H6 from '$lib/components/H6.svelte';
	import Link from '$lib/components/Link.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Paragraph from '$lib/components/Paragraph.svelte';
	import config from '$lib/config';
	import clsx from 'clsx';
	import FAQs from '$lib/components/FAQs.svelte';
	import H1 from '$lib/components/H1.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import SectionSeparator from '$lib/components/SectionSeparator.svelte';
	import Features1 from '$lib/components/Features1.svelte';
</script>

<!-- <main
	class="relative mx-auto flex min-h-screen max-w-screen-xl flex-col justify-center overflow-hidden px-8 py-16"
> -->
<main>
	<H1>Serverless database platform powered by PostgreSQL</H1>

	<FAQs />
	<SectionSeparator />

	<Features1 />

	<SectionSeparator />

	<Testimonials />

	<SectionSeparator />
</main>
