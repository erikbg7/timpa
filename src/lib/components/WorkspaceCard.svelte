<script lang="ts">
	import { enhance } from '$app/forms';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import type { Workspace } from '@prisma/client';

	export let wp: Workspace;
	let submitting: boolean = false;
</script>

<a
	href={`/dashboard/workspaces/${wp.id}`}
	class="relative rounded-md border border-white/10 bg-accent-content p-4"
>
	<!-- <div> -->
	<form
		method="post"
		action="/dashboard?/deleteWorkspace"
		class="text-end"
		use:enhance={() => {
			submitting = true;
			return ({ update }) => {
				// Set invalidateAll to false if you don't want to reload page data when submitting
				update({ invalidateAll: true }).finally(async () => {
					submitting = false;
				});
			};
		}}
	>
		<button type="submit" name="workspaceId" value={String(wp.id)}>
			<!-- delete -->
			{#if submitting}
				<span class="loading loading-spinner loading-xs"></span>
			{:else}
				<TrashIcon iconClass="size-4 hover:text-red-500" />
			{/if}
		</button>
		<!-- <TrashIcon iconClass="size-4 hover:text-red-500" /> -->
	</form>
	<!-- </div> -->

	<h4><strong>{wp.name}</strong></h4>
	<div class="flex flex-col">
		<p class="flex justify-between"><b>Flow Time:</b> <span>45min</span></p>
	</div>
</a>
