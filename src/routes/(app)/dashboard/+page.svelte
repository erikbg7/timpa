<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import DashboardSection from '$lib/components/DashboardSection.svelte';
	import WorkspaceCard from '$lib/components/WorkspaceCard.svelte';
	import WorkspaceCreationForm from '$lib/components/WorkspaceCreationForm.svelte';

	export let data;
	$: isCustomer = !!data?.customer || false;

	let dialog: HTMLDialogElement;
	let accessToken: string = data.session.access_token!;
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
				{#each data.files as wp}
					<WorkspaceCard {wp} {accessToken} />
				{/each}
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
