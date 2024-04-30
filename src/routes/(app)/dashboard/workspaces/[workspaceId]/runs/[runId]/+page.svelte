<script lang="ts">
	import DashboardSection from '$lib/components/DashboardSection.svelte';
	import type { PageServerData } from './$types';
	import SnapshotsComparison from '$lib/components/SnapshotsComparison.svelte';

	export let data: PageServerData;
	$: snapshotIndex = 0;
	$: selectedSnapshots = data.screenshots[snapshotIndex];
</script>

<DashboardSection title="Workspace - Run">
	<div slot="action">
		<button class="btn btn-success btn-sm">Approve Build</button>
		<button class="btn btn-error btn-sm">Reject Build</button>
	</div>
	<div slot="content">
		<div class="flex items-center gap-4">
			<div>
				<button
					class="btn btn-secondary btn-sm"
					on:click={() => (snapshotIndex -= 1)}
					disabled={snapshotIndex === 0}>Prev</button
				>
				<button
					class="btn btn-secondary btn-sm"
					on:click={() => (snapshotIndex += 1)}
					disabled={snapshotIndex === data.screenshots.length - 1}>Next</button
				>
			</div>
			<span class="badge badge-accent font-semibold">
				{snapshotIndex + 1}/{data.screenshots.length}
			</span>
			<span class="font-bold">{selectedSnapshots.name}</span>
		</div>
		<div class="flex p-4">
			<SnapshotsComparison data={selectedSnapshots} />
		</div>
	</div>
</DashboardSection>
