<script lang="ts">
	import { enhance } from '$app/forms';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import type { Workspace } from '@prisma/client';
	import { fly, slide } from 'svelte/transition';

	export let wp: Workspace;
	let submitting: boolean = false;
</script>

<div
	in:fly={{ y: 20 }}
	out:slide
	class="relative rounded-md border border-white/10 bg-accent-content p-4"
>
	<div class="absolute right-2 top-2">
		<form
			method="post"
			action="/dashboard?/deleteWorkspace"
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
				{#if submitting}
					<span class="loading loading-spinner loading-xs"></span>
				{:else}
					<TrashIcon iconClass="size-4 hover:text-red-500" />
				{/if}
			</button>
		</form>
	</div>
	<h4><strong>{wp.name}</strong></h4>
	{#if wp.description}
		<p class="text-neutral-400">{wp.description}</p>
	{/if}
	<div>
		<p class="flex justify-between"><b>Flow Time:</b> <span>45min</span></p>
	</div>
</div>
