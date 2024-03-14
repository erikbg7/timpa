<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { invalidate, invalidateAll } from '$app/navigation';

	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';

	export let data;

	$: route = $page.route;

	$: ({ supabase } = data);

	onMount(async () => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			// If you want to fain grain which routes should rerun their load function
			// when onAuthStateChange changges
			// use invalidate('supabase:auth')
			// which is linked to +layout.js depends('supabase:auth').
			// This should mainly concern all routes
			//that should be accesible only for logged in user.
			// Otherwise use invalidateAll()
			// which will rerun every load function of you app.
			// if (_session?.expires_at !== session?.expires_at) {
			// 	invalidate('supabase:auth');
			// }
			invalidate('supabase:auth');
			invalidateAll();
		});
		return () => subscription.unsubscribe();
	});
</script>

<Toaster />
{#if route?.id?.includes('(auth)') || route?.id?.includes('(legal)') || route?.id?.includes('(app)')}
	<slot />
{:else}
	<NavBar />
	<slot />
	<Footer />
{/if}
