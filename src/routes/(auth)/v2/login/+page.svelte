<script lang="ts">
	import { enhance } from '$app/forms';
	import H1 from '$lib/atoms/H1.svelte';
	import Paragraph from '$lib/atoms/Paragraph.svelte';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import config from '$lib/config';
</script>

<div class="relative flex flex-col-reverse md:flex-row md:justify-between">
	<div class="md:max-w-[30rem]">
		<H1 size="xl">
			{@html config.login.title}
		</H1>
		<Paragraph title={config.login.description} />
		<form method="post" action="signup?/login" use:enhance>
			<label class="text-lg font-semibold" for="email">Email Address</label>
			<div class="mb-16 mt-2 flex items-center gap-2">
				<input
					name="email"
					type="text"
					placeholder="Enter your email"
					class="w-full rounded-md border border-zinc-200 p-3 text-lg"
				/>
				<button class="w-fit text-nowrap rounded-md bg-primary px-4 py-3 text-lg text-white">
					Log in
				</button>
			</div>
		</form>
		<p class="text-lg font-semibold text-zinc-700">
			Don't have an account? <a class="hover:cursor text-primary" href="/signup"> Sign Up </a>
		</p>
	</div>
	<div class="my-24 flex h-fit flex-col rounded-md border border-zinc-200 bg-white p-8 shadow-lg">
		<h4 class="mx-6 mb-2 text-3xl font-semibold text-zinc-800">
			Or use your social login accounts
		</h4>
		<div class="mb-4 mt-8">
			<SocialButton value="Sign up with Google" provider="Google" />
			<SocialButton value="Sign up with Google" provider="Google" />
		</div>
	</div>
</div>

<style>
	:global(.signup-title > span) {
		color: theme('colors.blue.500');
	}
</style>
