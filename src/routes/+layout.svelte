<script>
	import { page } from '$app/stores';

	import '../app.css';
	import Footer from '$ui/components/Footer.svelte';
	import NavBar from '$ui/components/NavBar.svelte';
	import { Toaster } from 'svelte-sonner';
	// import { Toaster } from 'svelte-french-toast';

	$: route = $page.route;

	// export let data;
	// $: ({ supabase } = data);

	// onMount(async () => {
	// 	const {
	// 		data: { subscription },
	// 	} = supabase.auth.onAuthStateChange((event, _session) => {
	// 		// If you want to fain grain which routes should rerun their load function
	// 		// when onAuthStateChange changges
	// 		// use invalidate('supabase:auth')
	// 		// which is linked to +layout.js depends('supabase:auth').
	// 		// This should mainly concern all routes
	// 		// that should be accesible only for logged in user.
	// 		// Otherwise use invalidateAll()
	// 		// which will rerun every load function of you app.
	// 		// if (_session?.expires_at !== session?.expires_at) {
	// 		// 	invalidate('supabase:auth');
	// 		// }
	// 		invalidate('supabase:auth');
	// 		invalidateAll();
	// 	});
	// 	return () => subscription.unsubscribe();
	// });
</script>

{#if route?.id?.includes('(auth)') || route?.id?.includes('(legal)') || route?.id?.includes('app') || route?.id?.includes('onboarding')}
	<Toaster position="top-right" richColors theme="dark" />
	<slot />
{:else}
	<NavBar />
	<slot />
	<Footer />
{/if}
