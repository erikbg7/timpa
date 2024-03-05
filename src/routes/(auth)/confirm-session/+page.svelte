<script lang="ts">
	import { page } from '$app/stores';
	const email = $page.data.email;
</script>

<h2 class="mb-8 mt-2 text-2xl font-semibold tracking-wide">
	Hi <span class="text-accent">{email}</span>!
</h2>
<div
	class="flex h-fit flex-col gap-8 rounded-lg border border-white/10 bg-neutral-900 p-8 text-center shadow-lg"
>
	<p class="text-xl font-extralight tracking-wide text-neutral-300">
		We are happy you are joining us!
	</p>
	<p class="text-lg tracking-wide text-neutral-400">
		Please <b class="text-accent">check your email</b> to confirm your account.
	</p>
</div>
