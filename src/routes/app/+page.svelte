<script lang="ts">
	import Dialog from '$ui/components/Dialog.svelte';
	import Pricing from '$ui/components/Pricing.svelte';
	import DashboardSection from '$ui/components/DashboardSection.svelte';
	import WorkspaceCreationForm from '$ui/components/WorkspaceCreationForm.svelte';
	import { trpc } from '$lib/trpc/index.js';
	import { PredictionStatus } from '$lib/enums';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import StatusLabel from './upload/StatusLabel.svelte';
	import TrashIcon from '$lib/ui/icons/TrashIcon.svelte';

	const customer = trpc.customer.get.query();
	const deleteFile = trpc.files.delete.mutation();
	const listFiles = trpc.files.list.query(undefined, {
		refetchInterval: (query) => {
			const data = query.state.data || [];
			const pendingPredictions = data
				.filter((item) => item.id !== 'clx9690gg00009bi9u5gcp45a')
				.find((item) => item.status === PredictionStatus.IN_PROGRESS);
			return pendingPredictions ? 5000 : false;
		},
	});

	const aaa = trpc.files.getTranscription.query();
	$: console.log({ aaa: $aaa });

	const handleDeleteFile = (id: string) => async () => {
		await $deleteFile.mutateAsync({ id });
		trpc.files.list.utils.invalidate();
		dialog.close();
		toast.success('All file data has been deleted');
	};

	let dialog: HTMLDialogElement;
	$: isCustomer = $customer.data?.plan !== 'FREE';
</script>

<Dialog bind:dialog>
	<WorkspaceCreationForm on:success={() => dialog.close()} />
</Dialog>

{#if isCustomer}
	<DashboardSection title="Your results">
		<button slot="action" class="btn btn-primary btn-sm" on:click={() => goto('/app/upload')}>
			+ Add file
		</button>
		<div slot="content">
			{#if $listFiles.data}
				<table class="table table-zebra">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Extension</th>
							<th>Duration</th>
							<th>Size</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each $listFiles.data as file}
							<tr
								on:click={() => goto('/app/results/' + file.id)}
								class="transition-all hover:cursor-pointer hover:bg-neutral-600/40"
							>
								<th>{file.id}</th>
								<td>{file.name}</td>
								<td>{file.extension}</td>
								<td>{file.duration}</td>
								<td>{file.size}</td>
								<td><StatusLabel predictionStatus={file.status} /></td>
								<td
									><button on:click|stopPropagation={() => dialog.showModal()}><TrashIcon /></button
									></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
				<Dialog bind:dialog>
					<div class="flex flex-col">
						<h2>The file will be removed forever, do you wanna continue?</h2>
						<div>
							<button class="btn btn-primary" on:click={handleDeleteFile($listFiles.data[0].id)}
								>Yes</button
							>
							<button class="btn btn-secondary" on:click={() => dialog.close()}>No</button>
						</div>
					</div>
				</Dialog>
			{:else}
				<div>No files</div>
			{/if}
		</div>
	</DashboardSection>
{:else}
	<DashboardSection title="Your results">
		<div slot="content" class="h-full w-full">
			<h2>You cannot use this feature while being in the free plan</h2>
			<Pricing />
		</div>
	</DashboardSection>
{/if}
