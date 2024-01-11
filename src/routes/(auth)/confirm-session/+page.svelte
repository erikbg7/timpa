<script lang="ts">
	import { page } from '$app/stores';
	import config from '$lib/config';
	const email = $page.data.email;
</script>

<a href="/" aria-label={`Return to ${config.appName} homepage`}>
	<img alt="logo" src="logo.png" class="w-48" />
</a>
<h2 class="mb-8 mt-2 text-xl font-semibold tracking-wide">Hi {email}!</h2>
<div
	class="mb-24 flex h-fit flex-col rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-lg"
>
	<p class="mb-2 text-2xl tracking-wide text-zinc-600">We are happy you are joinin us!</p>
	<p class="my-6 text-lg tracking-wide text-zinc-800">
		Please <b>check your email</b> to confirm your account.
	</p>
</div>
