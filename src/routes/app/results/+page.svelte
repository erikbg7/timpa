<script lang="ts">
	import { trpc } from '$lib/trpc';
	import { toast } from 'svelte-sonner';
	import StatusLabel from '../../onboarding/upload/StatusLabel.svelte';
	import { PredictionStatus } from '@prisma/client';

	const listFiles = trpc.files.list.query(undefined, {
		refetchInterval: (query) => {
			const data = query.state.data || [];
			const pendingPredictions = data
				.filter((item) => item.id !== 'clx9690gg00009bi9u5gcp45a')
				.find((item) => item.status === PredictionStatus.IN_PROGRESS);
			return pendingPredictions ? 5000 : false;
		},
	});
	const handleRowClick = () => {
		toast.success('New transcription created', {
			description: 'Your results will be ready in a few minutes',
		});
	};
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center pb-36">
	{#if $listFiles.data}
		<table class="table table-zebra">
			<!-- head -->
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Extension</th>
					<th>Duration</th>
					<th>Size</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each $listFiles.data as file}
					<tr
						on:click={handleRowClick}
						class="transition-all hover:cursor-pointer hover:bg-neutral-600/40"
					>
						<th>{file.id}</th>
						<td>{file.name}</td>
						<td>{file.extension}</td>
						<td>{file.duration}</td>
						<td>{file.size}</td>
						<td><StatusLabel predictionStatus={file.status} /></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<div>No files</div>
	{/if}
</div>
