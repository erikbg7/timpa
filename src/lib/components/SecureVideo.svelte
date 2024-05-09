<script lang="ts">
	import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
	import { onMount } from 'svelte';

	export let privateUrl: string;
	export let accessToken: string;

	let localUrl: string;

	onMount(() => {
		fetch(privateUrl, {
			// headers: {
			// 	Authorization: `Bearer ${accessToken}`,
			// 	apikey: PUBLIC_SUPABASE_ANON_KEY,
			// },
		}).then(async (res) => {
			const blob = await res.blob();
			localUrl = URL.createObjectURL(blob);
		});
	});
</script>

{#if localUrl}
	<video id="video" controls class="flex aspect-video w-full items-center justify-center">
		<source src={localUrl} type="video/mp4" />
	</video>
{:else}
	<div class="flex aspect-video w-full items-center justify-center">
		<span class="loading loading-infinity loading-lg"></span>
	</div>
{/if}
