<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import DecorationCard from '$lib/decorations/DecorationCard.svelte';
	import DashboardSection from '$lib/components/DashboardSection.svelte';
	import { FlowEvents } from '$lib/workspaces/events';
	import { EventType } from '$lib/enums';
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import type { PageData, PageServerData } from './$types';
	import ListWrapper from '$lib/components/ListWrapper.svelte';
	import type { Run } from '@prisma/client';
	import RunCard from '$lib/components/RunCard.svelte';
	import type { RunWithScreenshots } from '$lib/types';

	export let data: PageServerData;
	const workspaceId = $page.params.workspaceId;

	console.log({ data22: data, page });

	$: {
		// events = new FlowEvents(data?.props?.events);
		// flowSessionId = data?.props?.activeFlowSessionId?.toString();
	}

	const runs = data.runs as RunWithScreenshots[];
	console.log({ runs });
</script>

<DashboardSection title={`Home > ${data.workspace.name}`}>
	<div slot="action">
		<!-- {#if !$page.data.props.activeFlowSessionId}
			<form method="post" action="?/createFlow" use:enhance={handleEnhancedForm}>
				<button
					class="btn btn-primary btn-sm relative"
					type="submit"
					name="eventType"
					value={EventType.CREATE}>+ Create New Session</button
				>
			</form>
		{/if} -->
	</div>
	<div slot="content" class="relative inset-0 flex w-full flex-col items-center justify-center">
		<ListWrapper items={runs} let:item={row}>
			<RunCard run={row} />
		</ListWrapper>
	</div>
</DashboardSection>
