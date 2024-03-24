<script lang="ts">
	import { page } from '$app/stores';
	import Seo from '$lib/components/SEO.svelte';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import SaasIcon from '$lib/icons/SaasIcon.svelte';

	const handleOnBack = () => window?.history?.back?.();

	const pathname = $page.url.pathname;

	const SEO_CONFIG: Record<string, string> = {
		'/privacy': 'Xata privacy policy',
		'/security': 'Xata security policy',
		'/terms': 'Xata terms and conditions',
	};
</script>

<Seo title={SEO_CONFIG[pathname]} description={SEO_CONFIG[pathname]} />
<main class="mx-auto max-w-3xl">
	<button class="absolute left-0 top-0 p-6" on:click={() => handleOnBack()}>
		<span class="flex items-center gap-3">
			<ArrowLeft iconClass="size-6 hover:text-accent transition-all" />
			<SaasIcon />
		</span>
	</button>
	<slot />
</main>

<style>
	:global(.legal-information-header) {
		@apply flex flex-col items-center gap-4 p-20;
	}
	:global(.legal-information-header > p) {
		@apply text-neutral-400;
	}
	:global(.legal-information-header > h1) {
		@apply text-6xl font-bold text-neutral-300;
	}
</style>
