<script lang="ts">
	import config from '$config';

	import TwitterIcon from '$ui/icons/TwitterIcon.svelte';
	import InstagramIcon from '$ui/icons/InstagramIcon.svelte';
	import GithubIcon from '$ui/icons/GithubIcon.svelte';
	import YoutubeIcon from '$ui/icons/YoutubeIcon.svelte';
	import TiktokIcon from '$ui/icons/TikTokIcon.svelte';
	import LinkedInIcon from '$ui/icons/LinkedinIcon.svelte';

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

<footer class="mx-auto max-w-screen-xl px-8 pb-12 pt-6">
	<div class="flex flex-col gap-3">
		<div class="flex flex-wrap justify-between gap-8">
			<ul class="flex gap-6">
				<li><a href="/privacy">Cookie Settings</a></li>
				<li><a href="/security">Security</a></li>
				<li><a href="/privacy">Privacy Policy</a></li>
				<li><a href="/terms">Terms and Conditions</a></li>
			</ul>
			<ul class="flex gap-3">
				{#each config.footer.socials as social}
					<li>
						<a
							class="text-sm font-semibold text-neutral-300"
							aria-label={social.ariaLabel}
							href={social.link}><svelte:component this={getIcon(social.icon)} /></a
						>
					</li>
				{/each}
			</ul>
		</div>
		<span class="text-sm text-zinc-400">Copyright {config.appName} 2024</span>
	</div>
</footer>
