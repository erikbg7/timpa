<script lang="ts">
	import type { RunWithScreenshots } from '$lib/types';
	import type { Run } from '@prisma/client';

	export let run: RunWithScreenshots;
</script>

<a href={`/dashboard/workspaces/${run.workspaceId}/runs/${run.id}`}>
	<div class="flex items-center justify-between bg-accent-content p-3">
		<div>{run.id}</div>
		<div>commit a43rt5s</div>
		<div><strong>{run.screenshots.length}</strong> snapshots</div>
		<div class="rounded-full bg-purple-200 px-6 py-1 text-xs font-bold text-purple-600">
			Unreviewed
		</div>
		<!-- <div>status: {run.status}</div> -->
	</div>
</a>
