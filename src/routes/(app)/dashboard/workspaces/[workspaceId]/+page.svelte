<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import DecorationCard from '$lib/decorations/DecorationCard.svelte';
	import DashboardSection from '$lib/components/DashboardSection.svelte';
	import { FlowEvents } from '$lib/workspaces/events';
	import { EventType } from '$lib/enums';
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let events: FlowEvents;
	let flowSessionId: string | undefined;

	export let data: PageData;

	$: {
		events = new FlowEvents(data?.props?.events);
		flowSessionId = data?.props?.activeFlowSessionId?.toString();
	}

	let updating: boolean = false;
	let interval: NodeJS.Timeout;
	let eventDuration: number = 0;

	const PROMPTS: Record<string, string> = {
		[EventType.ACTIVE]: 'Working hard...',
		[EventType.BREAK]: 'You are on a break, start working once you feel like it.',
		[EventType.INTERRUPTION]:
			'An interruption took you out of flow. We will take note to help avoid it next time.',
		[EventType.END]: 'Flow session has ended. Good job! Check your stats in the analytics section.',
	};

	const COLORS = {
		[EventType.ACTIVE]: 'bg-emerald-400',
		[EventType.BREAK]: 'bg-yellow-400',
		[EventType.INTERRUPTION]: 'bg-red-400',
		[EventType.END]: 'bg-purple-400',
	};

	onMount(() => {
		if (events.isEnded()) {
			return clearInterval(interval);
		}
		interval = setInterval(() => {
			eventDuration = events.getCurrentEventDuration();
			console.log({ eventDuration });
		}, 1000);

		return () => clearInterval(interval);
	});

	var toHHMMSS = (secs: number) => {
		var sec_num = secs;
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor(sec_num / 60) % 60;
		var seconds = sec_num % 60;

		return [hours, minutes, seconds]
			.map((v) => (v < 10 ? '0' + v : v))
			.filter((v, i) => v !== '00' || i > 0)
			.join(':');
	};

	const handleEnhancedForm = () => {
		updating = true;
		return ({ update }: { update: any }) => {
			// Set invalidateAll to false if you don't want to reload page data when updating
			update({ invalidateAll: true }).finally(async () => {
				updating = false;
			});
		};
	};
</script>

<DashboardSection title="Workspace things">
	<div slot="action">
		{#if !$page.data.props.activeFlowSessionId}
			<form method="post" action="?/createFlow" use:enhance={handleEnhancedForm}>
				<button
					class="btn btn-primary btn-sm relative"
					type="submit"
					name="eventType"
					value={EventType.CREATE}>+ Create New Session</button
				>
			</form>
		{/if}
	</div>
	<div slot="content" class="relative inset-0 flex w-full flex-col items-center justify-center">
		{#if !flowSessionId}
			<h2>Are you feeling like working a bit? Start a new session when you are ready.</h2>
			<div class="mx-24 my-12">
				{#each $page.data.props.flowSessions as fs}
					<h4>Flow Session {fs.id}</h4>
					{@const fsEvents = new FlowEvents(fs.events)}
					<div class="my-4 flex h-4 w-full rounded-sm bg-white/40">
						{#each fsEvents.getMappedEvents() as event}
							{@const duration = fsEvents.getSessionDuration()}
							{@const eventDurationPercentage = (event.duration / duration) * 100}
							<div
								style={`width: ${eventDurationPercentage}%`}
								class={clsx(
									'h-full opacity-70',
									{ [COLORS[event.eventType]]: true },
									// `w-[${eventDurationPercentage}%]`,
								)}
								title={event.eventType}
							></div>
						{/each}
					</div>
				{/each}
			</div>
		{:else}
			<div
				class="relative flex min-w-96 items-center justify-center rounded-md border border-white/10 bg-accent-content p-6"
			>
				<DecorationCard />
				<form
					method="post"
					action="?/updateFlow"
					use:enhance={handleEnhancedForm}
					class="flex w-full flex-col items-center"
				>
					<div class="grid w-full grid-cols-2 gap-3">
						<button
							type="submit"
							class="btn btn-primary btn-sm relative w-full"
							name="flowSessionEvent"
							disabled={events.isPaused() || events.isEnded() || updating}
							value={[EventType.BREAK, flowSessionId].join(',')}>Break</button
						>

						<button
							type="submit"
							class="btn btn-primary btn-sm relative w-full"
							name="flowSessionEvent"
							disabled={events.isPaused() || events.isEnded() || updating}
							value={[EventType.INTERRUPTION, flowSessionId].join(',')}>Interruption</button
						>
					</div>
					<div>
						<p class="my-8 text-8xl font-semibold">{toHHMMSS(eventDuration)}</p>
					</div>
					<div class="grid w-full grid-cols-2 gap-3">
						<button
							type="submit"
							class="btn btn-primary btn-sm relative w-full"
							name="flowSessionEvent"
							disabled={events.isActive() || events.isEnded() || updating}
							value={[EventType.ACTIVE, flowSessionId].join(',')}>Resume</button
						>

						<button
							type="submit"
							class="btn btn-primary btn-sm relative w-full"
							name="flowSessionEvent"
							disabled={events.isEnded() || updating}
							value={[EventType.END, flowSessionId].join(',')}>End</button
						>
					</div>
				</form>
			</div>

			<h2 class="mt-12">{PROMPTS[events.getCurrentEventType()]}</h2>
		{/if}
	</div>
</DashboardSection>
