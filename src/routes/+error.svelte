<script>
	// Aka 404 error page
	import Seo from '$lib/components/SEO.svelte';
</script>

<Seo />
<main>
	<div class="flex h-screen w-screen flex-col items-center justify-center">
		<img alt="page not found" src="/img/404.svg" class="max-w-sm" />
		<h2 class="mb-8 text-4xl font-semibold text-neutral-200">Page not found</h2>
		<p class="mb-8 max-w-sm text-center md:max-w-lg">
			We're sorry, but the page you requested could not be found. This could be because the page has
			been moved or deleted. We're tracking these errors so we can fix them in the future.
		</p>
		<a href="/" class="btn btn-secondary btn-sm">Back home</a>
	</div>
</main>
