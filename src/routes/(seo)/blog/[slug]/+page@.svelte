<script>
	import H1 from '$ui/atoms/H1.svelte';
	import Paragraph from '$ui/atoms/Paragraph.svelte';

	export let data;
</script>

<article class="py-24">
	<header class="mx-auto max-w-4xl px-4 lg:px-0">
		<H1
			title={data.title}
			className="text-4xl sm:text-6xl text-balance mb-8"
			viewTransitionName={`title-${data.slug}`}
		/>
		<Paragraph title={data.description} className="text-lg mb-8" />
		<div class="grid grid-cols-2">
			<span class="flex items-center gap-2"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6 stroke-primary"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
					/>
				</svg>
				<time>{data.date}</time></span
			>
			<span class="flex items-center gap-2"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6 stroke-primary"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>

				<span>{data.readingTime} mins read</span>
			</span>
		</div>
		<img
			src={data.image}
			alt="featured"
			loading="lazy"
			class="my-12 rounded-md border border-primary"
			style:--image="image-{data.slug}"
		/>
	</header>

	<hr class="mb-12 opacity-20" />

	<section class="mx-auto max-w-4xl px-4 text-justify lg:px-0">
		<svelte:component this={data.content} />
	</section>
</article>

<style>
	img {
		view-transition-name: var(--image);
	}

	:root::view-transition-old(title-*) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(title-*) {
		animation: 300ms cubic-bezier(0, 0, 0.2, 1) both slide-from-right;
	}
</style>
