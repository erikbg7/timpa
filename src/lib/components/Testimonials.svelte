<script>
	import config from '$lib/config';

	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import DecorationRight from '$lib/decorations/DecorationRight.svelte';
	import DecorationLeft from '$lib/decorations/DecorationLeft.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const testimonials = config.testimonials.list;
</script>

<section id="testimonials" class="relative">
	<DecorationLeft />
	<DecorationRight />

	<SectionHeader title={config.testimonials.title} description={config.testimonials.description} />

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
