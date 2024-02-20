<script lang="ts">
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
	<div class="card-user flex gap-4 p-4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 175 59"
			class="css-e7jlas absolute right-0 top-0 h-[59px] w-[175px] fill-none"
			><g stroke="currentColor" opacity="0.1"
				><path d="M37.5.5C49.5 21 63.526 34.31 95 17c30-16.5 74-1 79.5 5.5"></path><path
					d="M17 1.5C29 22 59.171 60.18 95 33c29-22 74-3 79.5 3.5"
				></path><path
					d="M1 1.5C13 22 47.41 78.968 95 50c34.5-21 74.5-5 79.5 0M58 1c4 9.167 16.4 22 34 0"
				></path></g
			></svg
		>
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

<style>
	.card {
		background-color: #161522;
	}
	.card-user {
		background-color: #161522;
	}
</style>
