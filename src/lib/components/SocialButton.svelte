<script lang="ts">
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte';

	export let value: string;
	export let provider: 'Google';

	const socials = {
		Google: GoogleIcon,
	} as const;

	const getSocialIcon = (icon: string) => {
		// @ts-ignore
		return socials[icon];
	};
</script>

<button
	class="mb-4 flex w-full justify-center rounded-md border border-zinc-400 p-3 text-lg font-semibold text-zinc-800"
>
	<svelte:component this={getSocialIcon(provider)} />
	{value}
</button>
