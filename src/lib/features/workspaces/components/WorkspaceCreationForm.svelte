<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let submitting = false;
</script>

<form
	method="post"
	action="/dashboard?/createWorkspace"
	use:enhance={() => {
		submitting = true;
		return ({ update }) => {
			// Set invalidateAll to false if you don't want to reload page data when submitting
			update({ invalidateAll: true }).finally(async () => {
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
			type="text"
			name="name"
			placeholder="Project name"
			class="input input-bordered input-sm w-full"
		/>
	</label>
	<label class="form-control mt-3">
		<div class="label">
			<span class="label-text">Description</span>
		</div>
		<textarea
			class="textarea textarea-bordered h-24"
			name="description"
			placeholder="Project description"
		></textarea>
	</label>
	<button disabled={submitting} class="btn btn-primary btn-sm mt-4" type="submit"
		>Submit {#if submitting}<span class="loading loading-spinner loading-xs ml-2"></span>
		{/if}</button
	>
</form>
