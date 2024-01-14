<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import config from '$lib/config';
	import InputText from '$lib/components/InputText.svelte';
	import ListBullet from '$lib/components/ListBullet.svelte';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import H6 from '$lib/components/H6.svelte';
	import Paragraph from '$lib/components/Paragraph.svelte';
	import H1 from '$lib/components/H1.svelte';
	import H2 from '$lib/components/H2.svelte';

	export let form: ActionData;

	$: console.log({ form });
</script>

<div class="relative flex flex-col-reverse py-12 md:flex-row md:justify-between">
	<div class="md:max-w-[30rem]">
		<H6 title="Try {config.appName} for free" />
		<H1 size="xl">
			{@html config.signup.title}
		</H1>
		<Paragraph title={config.signup.description} />
		<div>
			<H2 title="This Teams trial includes upgrades like:" />
			<ol>
				{#each config.signup.features as feature}
					<li class="mb-4 flex items-start text-lg text-zinc-500">
						<ListBullet />
						<div class="ml-4">{feature}</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
	<div class="flex h-fit flex-col rounded-md border border-zinc-200 bg-white p-8 shadow-lg">
		<h4 class="mx-6 mb-2 text-3xl font-semibold text-zinc-800">
			Sign up for your {config.appName} account
		</h4>
		<p class="text-center text-lg tracking-wide text-zinc-700">
			Always free! No credit card required
		</p>
		<div class="mt-8">
			<form method="post" action="?/login" use:enhance>
				<InputText name="email" placeholder="Enter your email" error={form?.errors?.email} />
				<button class="btn btn-primary btn-block mb-4 mt-8 text-lg font-normal text-white">
					Sign up
				</button>
			</form>
		</div>
		<div>
			<h3 class="mb-9 mt-6 flex w-full items-center">
				<span class="h-[1px] flex-grow rounded bg-zinc-300"></span>
				<span class="mx-3 text-sm text-zinc-700">OR</span>
				<span class="h-[1px] flex-grow rounded bg-zinc-300"></span>
			</h3>
		</div>
		<div class="mb-4 flex flex-col gap-4">
			<SocialButton value="Sign up with Google" provider="Google" />
			<SocialButton value="Sign up with Google" provider="Google" />
		</div>
		<a class="hover:cursor text-primary text-center font-semibold" href="/login">Log In</a>
	</div>
</div>

<style>
	:global(.signup-title > span) {
		color: theme('colors.blue.500');
	}
</style>
