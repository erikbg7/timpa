<script lang="ts">
	import clsx from 'clsx';
	import config, { type AuthMode } from '$config';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Seo from '$lib/components/SEO.svelte';

	export let form: ActionData;

	let mode: AuthMode;
	$: urlMode = $page.url.searchParams.get('mode') as AuthMode;
	$: mode = urlMode || 'signin';

	const texts = config.auth.texts;
	const providers = config.auth.providers;
</script>

<Seo showDescription={false} title={texts[mode].seoTitle} />

<div class="mb-8 flex flex-col gap-2 text-sm">
	<h1 class="text-3xl font-semibold text-neutral-200">{texts[mode].title}</h1>
	<p class="text-neutral-400">{@html texts[mode].subtitle}</p>
</div>

{#if ['signin', 'signup'].includes(mode)}
	<form method="post" action={`signin?/signInWithProvider`} use:enhance>
		{#each providers as provider}
			<button
				name="provider"
				value={provider.id}
				class={clsx(
					'btn btn-sm mb-6 h-[2.5rem] w-full ',
					provider.primary ? 'btn-primary text-neutral-200' : 'btn-secondary',
				)}
			>
				{provider.title}
			</button>
		{/each}
	</form>
	<p class="text-center text-sm">
		or <a class="text-sm text-accent" href="/signin?mode=magiclink"
			>continue with email magic link</a
		>
	</p>
{/if}

{#if mode === 'magiclink'}
	<form method="post" action="signin?/signInWithMagicLink" use:enhance>
		<label class="text-xs font-semibold" for="email">Email Address</label>
		<div class="mb-8 mt-1 flex flex-col items-start gap-4">
			<input
				name="email"
				type="text"
				required
				placeholder="user@example.com"
				class={clsx('text-md w-full rounded-md border border-white/10 bg-neutral-900 p-2', {
					'input-error': form?.errors?.email,
				})}
			/>
			{#if form?.errors?.email}
				<p class="text-xs text-red-500">{form?.errors?.email}</p>
			{/if}
			<button class="w-fit text-nowrap rounded-md bg-primary px-4 py-2 text-lg text-white">
				Log in
			</button>
		</div>
	</form>
{/if}
