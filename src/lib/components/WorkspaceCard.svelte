<script lang="ts">
	import { enhance } from '$app/forms';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import type { File } from '@prisma/client';
	import SecureVideo from './SecureVideo.svelte';
	import { invalidate } from '$app/navigation';

	export let wp: File;
	export let accessToken: string;
	let submitting: boolean = false;

	function handleFileRemoval(event: Event) {
		console.log('Removing file');
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData();
		formData.append('fileId', String(wp.id));

		// const form = event.target as HTMLFormElement;
		console.log({ formData });
		// return;
		submitting = true;
		fetch('/api/transcript-file', { method: 'DELETE', body: formData })
			.then(() => {
				submitting = false;
				invalidate('dashboard-files');
				form.remove();
			})
			.catch(() => {
				submitting = false;
			});
	}
</script>

<div class="relative rounded-md border border-white/10 bg-accent-content p-4">
	<!-- <div> -->
	<form class="absolute right-2 top-2 cursor-pointer" on:submit={handleFileRemoval}>
		<button type="submit" name="fileId" value={String(wp.id)}>
			{#if submitting}
				<span class="loading loading-spinner loading-xs"></span>
			{:else}
				<TrashIcon iconClass="size-4 hover:text-red-500" />
			{/if}
		</button>
	</form>
	<!-- </div> -->

	<!-- <a href={`/dashboard/workspaces/${wp.id}`}> -->
	<h4><strong>{wp.name}</strong></h4>
	<div class="p-3">
		<SecureVideo privateUrl={wp.url} {accessToken} />
	</div>
	<div class="flex flex-col">
		<p class="flex justify-between"><b>Flow Time:</b> <span>45min</span></p>
	</div>
	<!-- </a> -->
</div>
