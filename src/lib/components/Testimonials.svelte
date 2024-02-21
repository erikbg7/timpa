<script>
	import config from '$lib/config';
	import testimonials from '$lib/testimonials';

	import Paragraph from '../atoms/Paragraph.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import DecorationRight from '$lib/decorations/DecorationRight.svelte';
	import DecorationLeft from '$lib/decorations/DecorationLeft.svelte';
	import H2 from '$lib/atoms/H2.svelte';
</script>

<section class="relative">
	<DecorationLeft />
	<DecorationRight />

	<div class="mx-auto mb-16 max-w-4xl text-center text-neutral-500 dark:text-neutral-400">
		<H2 size="lg">Join the Community</H2>
		<Paragraph
			title="Join tens of thousands of developers who are working with {config.appName} to build better products"
		/>
	</div>

	<div class="mx-auto grid max-w-screen-xl grid-cols-3 gap-x-12 px-8">
		<div class="flex flex-col justify-center gap-12">
			{#each testimonials.slice(0, 3) as testimonial}
				<TestimonialCard {testimonial} />
			{/each}
		</div>
		<div class="flex flex-col justify-center gap-12">
			{#each testimonials.slice(3, 6) as testimonial}
				<TestimonialCard {testimonial} />
			{/each}
		</div>
		<div class="flex flex-col justify-center gap-12">
			{#each testimonials.slice(6, 9) as testimonial}
				<TestimonialCard {testimonial} />
			{/each}
		</div>
	</div>
</section>
