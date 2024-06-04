<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let submitting = false;
</script>

<form
	method="post"
	action="/api/transcript-file"
	enctype="multipart/form-data"
	use:enhance={() => {
		submitting = true;
		return ({ update }) => {
			// Set invalidateAll to false if you don't want to reload page data when submitting
			update({ invalidateAll: true }).finally(async () => {
				invalidate('dashboard-files');
				dispatch('success');
				submitting = false;
			});
		};
	}}
>
	<header>
		<h2 class="font-semibold">Create new workspace</h2>
	</header>
	<label class="form-control mt-3">
		<div class="label">
			<span class="label-text">Name</span>
		</div>
		<input
			required
			class="file-input w-full max-w-xs"
			accept=".mp4,.mp3,.wav"
			id="video"
			name="file"
			type="file"
			multiple={false}
		/>
	</label>

	<button disabled={submitting} class="btn btn-primary btn-sm mt-4" type="submit"
		>Submit {#if submitting}<span class="loading loading-spinner loading-xs ml-2"></span>
		{/if}</button
	>
</form>
