<script lang="ts">
	import clsx from 'clsx';
	import config from '$lib/config';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Seo from '$lib/components/SEO.svelte';

	type AuthMode = 'signin' | 'signup' | 'magiclink';

	export let form: ActionData;

	let mode: AuthMode;
	$: urlMode = $page.url.searchParams.get('mode') as AuthMode;
	$: mode = urlMode || 'signin';

	const title: Record<AuthMode, string> = {
		signin: 'Sign in',
		signup: 'Get Started',
		magiclink: 'Sign in',
	};

	const subtitle: Record<AuthMode, string> = {
		signin: `New to ${config.appName}? <a class="text-accent" href="/signin?mode=signup"> Sign up now </a>`,
		signup: `${config.appName} doesn't require a credit card to start. Our free plan works great for hobby projects.`,
		magiclink: `${config.appName} will send you an email with a magic link to sign in. No password required.`,
	};

	const seoTitle: Record<AuthMode, string> = {
		signin: 'Sign in',
		signup: 'Sign up',
		magiclink: 'Sign in',
	};
</script>

<Seo showDescription={false} title={seoTitle[mode]} />

<div class="mb-8 flex flex-col gap-2 text-sm">
	<h1 class="text-3xl font-semibold text-neutral-200">{title[mode]}</h1>
	<p class="text-neutral-400">{@html subtitle[mode]}</p>
</div>

{#if ['signin', 'signup'].includes(mode)}
	<form method="post" action={`signin?/signInWithProvider`} use:enhance>
		<button
			name="provider"
			value="github"
			class="btn btn-primary btn-sm mb-6 h-[2.5rem] w-full text-neutral-200"
		>
			Continue with Github
		</button>
	</form>
	<form method="post" action={`signin?/signInWithProvider`} use:enhance>
		<button name="provider" value="google" class="btn btn-secondary btn-sm mb-6 h-[2.5rem] w-full"
			>Continue with Google</button
		>
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
