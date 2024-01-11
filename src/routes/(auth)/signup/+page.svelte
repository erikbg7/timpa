<script lang="ts">
	import { enhance } from '$app/forms';
	import ListBullet from '$lib/components/ListBullet.svelte';
	import config from '$lib/config';
</script>

<div class="relative flex flex-col-reverse py-12 md:flex-row md:justify-between">
	<div class="md:max-w-[30rem]">
		<h6 class="mb-6 text-sm font-semibold uppercase text-blue-500">
			Try {config.appName} for free
		</h6>
		<h1 class="signup-title mb-8 text-7xl font-semibold leading-tight text-zinc-700">
			{@html config.signup.title}
		</h1>
		<p class="mb-8 text-lg leading-relaxed tracking-wide text-zinc-500">
			{config.signup.description}
		</p>
		<div>
			<h2 class="mb-6 text-2xl font-semibold text-zinc-800">
				This Teams trial includes upgrades like:
			</h2>
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
				<input
					name="email"
					type="text"
					placeholder="Enter your email"
					class="mb-8 w-full rounded-md border border-zinc-200 p-3 text-lg"
				/>
				<button class="mb-4 w-full rounded-md bg-blue-500 p-3 text-lg text-white"> Sign up </button>
			</form>
		</div>
		<div>
			<h3 class="mb-9 mt-6 flex w-full items-center">
				<span class="h-[1px] flex-grow rounded bg-zinc-300"></span>
				<span class="mx-3 text-sm text-zinc-700">OR</span>
				<span class="h-[1px] flex-grow rounded bg-zinc-300"></span>
			</h3>
		</div>
		<div class="mb-4">
			<button
				class="mb-4 flex w-full justify-center rounded-md border border-zinc-400 p-3 text-lg font-semibold text-zinc-800"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24px"
					height="24px"
					fill="none"
					viewBox="0 0 30 30"
					style="margin-right: 16px;"
					><g clip-path="url(#a)"
						><path
							fill="#4285F4"
							d="M29.681 15.338c0-.988-.087-1.925-.237-2.838H15.319v5.637h8.087c-.362 1.85-1.425 3.413-3 4.476v3.75h4.825c2.825-2.613 4.45-6.463 4.45-11.025Z"
						></path><path
							fill="#34A853"
							d="M15.319 30c4.05 0 7.437-1.35 9.912-3.638l-4.825-3.75c-1.35.9-3.062 1.45-5.087 1.45-3.913 0-7.225-2.637-8.413-6.2H1.931v3.863C4.394 26.625 9.456 30 15.32 30Z"
						></path><path
							fill="#FBBC05"
							d="M6.906 17.863A8.704 8.704 0 0 1 6.431 15c0-1 .175-1.962.475-2.862V8.275H1.931a14.826 14.826 0 0 0 0 13.45l4.975-3.862Z"
						></path><path
							fill="#EA4335"
							d="M15.319 5.938c2.212 0 4.187.762 5.75 2.25l4.275-4.276C22.756 1.487 19.369 0 15.319 0 9.456 0 4.394 3.375 1.93 8.275l4.975 3.862c1.188-3.562 4.5-6.2 8.413-6.2Z"
						></path></g
					><defs><clipPath id="a"><path fill="#fff" d="M0 0h30v30H0z"></path></clipPath></defs></svg
				>Sign up with Google
			</button>
			<button
				class="mb-4 flex w-full justify-center rounded-md border border-zinc-400 p-3 text-lg font-semibold text-zinc-800"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24px"
					height="24px"
					fill="none"
					viewBox="0 0 30 30"
					style="margin-right: 16px;"
					><g clip-path="url(#a)"
						><path
							fill="#4285F4"
							d="M29.681 15.338c0-.988-.087-1.925-.237-2.838H15.319v5.637h8.087c-.362 1.85-1.425 3.413-3 4.476v3.75h4.825c2.825-2.613 4.45-6.463 4.45-11.025Z"
						></path><path
							fill="#34A853"
							d="M15.319 30c4.05 0 7.437-1.35 9.912-3.638l-4.825-3.75c-1.35.9-3.062 1.45-5.087 1.45-3.913 0-7.225-2.637-8.413-6.2H1.931v3.863C4.394 26.625 9.456 30 15.32 30Z"
						></path><path
							fill="#FBBC05"
							d="M6.906 17.863A8.704 8.704 0 0 1 6.431 15c0-1 .175-1.962.475-2.862V8.275H1.931a14.826 14.826 0 0 0 0 13.45l4.975-3.862Z"
						></path><path
							fill="#EA4335"
							d="M15.319 5.938c2.212 0 4.187.762 5.75 2.25l4.275-4.276C22.756 1.487 19.369 0 15.319 0 9.456 0 4.394 3.375 1.93 8.275l4.975 3.862c1.188-3.562 4.5-6.2 8.413-6.2Z"
						></path></g
					><defs><clipPath id="a"><path fill="#fff" d="M0 0h30v30H0z"></path></clipPath></defs></svg
				>Sign up with Google
			</button>
		</div>
		<a class="hover:cursor text-center font-semibold text-blue-500" href="/login">Log In</a>
	</div>
</div>

<style>
	:global(.signup-title > span) {
		color: theme('colors.blue.500');
	}
</style>
