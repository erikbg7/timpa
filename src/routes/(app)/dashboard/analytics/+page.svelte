<script lang="ts">
	import { page } from '$app/stores';
	import { type IWorkspace } from '$lib/types';
	import { FlowEvents } from '$lib/workspaces/events';

	const workspaces = $page.data?.customer?.workspaces || [];

	let selected: IWorkspace;

	$: flowEvents = new FlowEvents(selected?.flowSessions?.[0]?.events);

	// $: f = FlowEventsF(selected?.flowSessions?.[0]?.events);
</script>

<div>
	<select
		bind:value={selected}
		class="mt-2 block w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 text-base text-neutral-900 focus:border-primary focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-primary dark:focus:bg-neutral-900"
	>
		{#each workspaces as workspace}
			<option value={workspace}>{workspace.name}</option>
		{/each}
	</select>

	<div class="py-24">
		{#if selected}
			<h1>{flowEvents.isEnded()}</h1>
			<pre>{JSON.stringify(flowEvents.getFlowAnalytics())}</pre>
		{:else}
			<p>Select a workspace</p>
		{/if}
	</div>
</div>
