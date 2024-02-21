<script lang="ts">
	import DecorationCard from '$lib/decorations/DecorationCard.svelte';

	interface ITestimonial {
		name: string;
		username?: string;
		role?: string;
		image: string;
		message: string;
	}

	// export let name: ITestimonial['name'];
	// export let username: ITestimonial['username'];
	// export let role: ITestimonial['role'];
	// export let image: ITestimonial['image'];
	// export let message: ITestimonial['message'];

	export let testimonial: ITestimonial;
</script>

<div class="relative overflow-hidden rounded-md border border-neutral-900/10 dark:border-white/10">
	<div class="flex gap-4 bg-accent-content p-4">
		<DecorationCard />
		<div class="size-12 overflow-hidden rounded-full">
			<img alt="prof" src={testimonial.image} />
		</div>
		<div>
			<p class="text-neutral-50">{testimonial.name}</p>
			<p class="font-light text-accent">{testimonial.username}</p>
			{#if testimonial.role}
				<p class="text-sm text-neutral-400">{testimonial.role}</p>
			{/if}
		</div>
	</div>
	<div
		class="border-t border-t-neutral-900/10 bg-base-100 p-4 text-sm opacity-100 dark:border-white/10"
	>
		{@html testimonial.message}
	</div>
</div>
