<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import type { FlowSession, Workspace } from '@prisma/client';

	export let wp: Workspace & { flowSessions: FlowSession[] };
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
	{#if wp.description}
		<p class="text-neutral-400">{wp.description}</p>
	{/if}
	<div class="flex flex-col">
		<p class="flex justify-between"><b>Flow Time:</b> <span>45min</span></p>
		<p class="flex justify-between"><b>Total Sessions:</b> <span>{wp.flowSessions.length}</span></p>
		{#if wp.activeFlowSessionId}
			<p class="flex justify-between"><b>1 session active</b></p>
		{/if}
	</div>
</a>
