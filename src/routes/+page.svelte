<script lang="ts">
	import H1 from '$lib/atoms/H1.svelte';
	import SectionSeparator from '$lib/decorations/SectionSeparator.svelte';
	import HeroGradient from '$lib/decorations/HeroGradient.svelte';
	import DecorationHero from '$lib/decorations/DecorationHero.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Features1 from '$lib/components/Features1.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import FAQs from '$lib/components/FAQs.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	const handlePost = async () => {
		const res = await fetch(`${PUBLIC_BASE_URL}/api/stripe-webhook`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: 'John' }),
		});
		const data = await res.json();
		console.log(data);
	};
</script>

<!-- <main
	class="relative mx-auto flex min-h-screen max-w-screen-xl flex-col justify-center overflow-hidden px-8 py-16"
> -->

<Seo preconnectLinks={['https://xata.io']} />

<main>
	<section class="relative mt-6 min-h-screen">
		<HeroGradient />
		<DecorationHero />
		<div class="relative flex h-screen flex-col justify-center px-2">
			<div class="mb-20 grid grid-cols-1 lg:grid-cols-2 lg:px-32">
				<div class="flex max-w-lg flex-col justify-center">
					<H1 size="lg">Serverless database platform powered by PostgreSQL</H1>
					<p class="mb-8">
						Modern applications are complex. We make the data part easy with the functionality your
						application needs to evolve and scale.
					</p>
					<div>
						<button on:click={handlePost} class="btn btn-primary btn-sm">Start Free</button>
						<button class="btn btn-secondary btn-sm">How It Works</button>
					</div>
				</div>
				<img alt="xata hero" width="100%" src="/hero.webp" />
			</div>
		</div>

		<div class="absolute bottom-12 left-0 right-0 flex flex-col items-center">
			<p class="py-6 text-lg font-semibold opacity-60">Follow our journey on</p>
			<div class="flex flex-wrap items-center justify-center">
				<img
					alt="techcrunch social logo"
					class="filter-to-white my-2 mr-6 h-4 w-auto md:h-6"
					src="/socials/techcrunch.webp"
				/>
				<img
					alt="stability social logo"
					class="filter-to-white my-2 mr-6 h-4 w-auto md:h-6"
					src="/socials/stability-ai.webp"
				/>
				<img
					alt="fstoppers social logo"
					class="filter-to-white my-2 mr-6 h-4 w-auto md:h-6"
					src="/socials/fstoppers.webp"
				/>
				<img
					alt="tiktok social logo"
					class="filter-to-white my-2 mr-6 h-4 w-auto md:h-6"
					src="/socials/tiktok.webp"
				/>
				<img
					alt="instagram social logo"
					class="filter-to-white mb-2 mr-6 mt-3 h-4 w-auto md:h-6"
					src="/socials/instagram.webp"
				/>
			</div>
		</div>
	</section>
	<SectionSeparator />

	<Features1 />
	<SectionSeparator />

	<Pricing />
	<SectionSeparator />

	<FAQs />
	<SectionSeparator />

	<Testimonials />
	<SectionSeparator />

	<Banner />
	<SectionSeparator />
</main>

<style>
	.filter-to-white {
		filter: invert(1) saturate(0) brightness(2);
		mix-blend-mode: lighten;
		vertical-align: middle;
	}

	.filter-to-gray {
		filter: invert(72%) sepia(14%) saturate(225%) hue-rotate(179deg) brightness(88%) contrast(90%);
		mix-blend-mode: lighten;
		vertical-align: middle;
	}
</style>
