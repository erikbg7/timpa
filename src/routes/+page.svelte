<script lang="ts">
	import FAQs from '$lib/components/FAQs.svelte';
	import H1 from '$lib/atoms/H1.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import SectionSeparator from '$lib/decorations/SectionSeparator.svelte';
	import Features1 from '$lib/components/Features1.svelte';
	import HeroGradient from '$lib/decorations/HeroGradient.svelte';
	import DecorationHero from '$lib/decorations/DecorationHero.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
</script>

<!-- <main
	class="relative mx-auto flex min-h-screen max-w-screen-xl flex-col justify-center overflow-hidden px-8 py-16"
> -->
<main>
	<section class="relative">
		<HeroGradient />
		<DecorationHero />
		<div class="relative">
			<H1>Serverless database platform powered by PostgreSQL</H1>
			<FAQs />
		</div>
	</section>
	<SectionSeparator />

	<Features1 />

	<SectionSeparator />

	<Testimonials />

	<SectionSeparator />

	<Pricing />

	<SectionSeparator />
</main>
