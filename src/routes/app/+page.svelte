<script lang="ts">
	import Dialog from '$ui/components/Dialog.svelte';
	import Pricing from '$ui/components/Pricing.svelte';
	import DashboardSection from '$ui/components/DashboardSection.svelte';
	import WorkspaceCard from '$ui/components/WorkspaceCard.svelte';
	import WorkspaceCreationForm from '$ui/components/WorkspaceCreationForm.svelte';
	import { trpc } from '$lib/trpc/index.js';

	const customer = trpc.customer.get.query();
	$: isCustomer = $customer.data?.plan !== 'FREE';


	let dialog: HTMLDialogElement;
	const files = trpc.files.list.query();
</script>

<Dialog bind:dialog>
	<WorkspaceCreationForm on:success={() => dialog.close()} />
</Dialog>

{#if isCustomer}
	<DashboardSection title="Your workspaces">
		<button slot="action" class="btn btn-primary btn-sm" on:click={() => dialog.showModal()}>
			+ Add file
		</button>
		<div slot="content">
			<div class="grid grid-cols-3 gap-6">
			</div>
		</div>
	</DashboardSection>
{:else}
	<DashboardSection title="Your workspaces">
		<div slot="content" class="h-full w-full">
			<h2>You cannot use this feature while being in the free plan</h2>
			<Pricing />
		</div>
	</DashboardSection>
{/if}
