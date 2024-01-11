<script>
	import { enhance } from '$app/forms';
	import '../app.css';
	export let data;

	// import { invalidate } from '$app/navigation';

	// export let data;
	// let { supabase, session } = data;
	// $: ({ supabase, session } = data);

	// onMount(() => {
	// 	const { data } = supabase.auth.onAuthStateChange((event, _session) => {
	// 		console.log({ _session });
	// 		if (_session?.expires_at !== session?.expires_at) {
	// 			invalidate('supabase:auth');
	// 		}
	// 	});

	// 	return () => data.subscription.unsubscribe();
	// });
</script>

<!-- <span id="auth_header">
	{#if !data.session}
		<a href="/login">login</a> / <a href="/signup">signup</a>
	{:else}
		<a href="/user_profile">User profile</a>
		<form action="/signup?/logout" method="POST" use:enhance>
			<button type="submit">Logout</button>
		</form>
	{/if}
</span> -->
<slot />

<!-- <script lang="ts">
	import '../app.css';
	import config from '$lib/config';

	import TwitterIcon from '$lib/icons/TwitterIcon.svelte';
	import InstagramIcon from '$lib/icons/InstagramIcon.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import YoutubeIcon from '$lib/icons/YoutubeIcon.svelte';
	import TiktokIcon from '$lib/icons/TikTokIcon.svelte';
	import LinkedInIcon from '$lib/icons/LinkedinIcon.svelte';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			console.log({ _session });
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	// console.log({ aaaa: supabase, rest });

	// You can get any missing icon from https://icons8.com/icons/set/tiktok
	const socials = {
		twitter: TwitterIcon,
		instagram: InstagramIcon,
		linkedin: LinkedInIcon,
		github: GithubIcon,
		youtube: YoutubeIcon,
		tiktok: TiktokIcon,
	} as const;

	const getIcon = (icon: string) => {
		// @ts-ignore
		return socials[icon];
	};
</script>

<slot />
<footer class="mx-auto max-w-screen-xl border-t border-zinc-300 py-12">
	<div class="flex flex-col gap-3">
		<div class="flex justify-between">
			<ul class="flex gap-6 text-sm font-semibold">
				<li>Privacy</li>
				<li>Terms and Conditions</li>
				<li>Cookie Settings</li>
			</ul>
			<ul class="flex gap-3">
				{#each config.footer.socials as social}
					<li>
						<a class="text-sm font-semibold text-zinc-800" href={social.link}
							><svelte:component this={getIcon(social.icon)} /></a
						>
					</li>
				{/each}
			</ul>
		</div>
		<span class="text-sm text-zinc-500">Copyright {config.appName} 2024</span>
	</div>
</footer> -->

<style>
	#auth_header {
		float: right;
	}
	form {
		display: inline;
	}
</style>
