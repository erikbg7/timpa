<script>
	import Footer from '$lib/components/Footer.svelte';
	import config from '$lib/config';
</script>

<nav
	class="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-start border-b border-zinc-300 bg-white px-8"
>
	<div class="mx-auto w-full max-w-screen-xl px-8">
		<div class="w-full">
			<a href="/" aria-label={`Return to ${config.appName} homepage`}>
				<img alt="logo" src="logo.png" class="h-10" />
			</a>
		</div>
	</div>
</nav>
<main
	class="relative mx-auto flex min-h-screen max-w-screen-xl flex-col justify-center overflow-hidden px-8 py-16"
>
	<img
		alt="background"
		src="background-shape.svg"
		class="absolute right-0 h-screen -rotate-45 opacity-35"
	/>
	<slot />
</main>
<Footer />
