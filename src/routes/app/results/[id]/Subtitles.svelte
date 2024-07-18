<script lang="ts">
	import clsx from 'clsx';
	import type { Segment } from '@prisma/client';
	import { currentTime, video } from '$lib/stores/audio-transcription';
	import { TimeCodeParser } from '$lib/srt';

	const MAX_CPS = 20; // More than 20 characters per second is difficult to read and understand

	const timeCodeParser = new TimeCodeParser('srt');

	function getSegmentCps(segment: Segment) {
		const cps = Math.floor(segment.text.replaceAll(' ', '').length / (segment.end - segment.start));
		return cps;
	}

	function goToVideoSegment(timestamp: number) {
		currentTime.set(timestamp);
	}

	$: segments = $video.segments;
</script>

<div class="flex w-full flex-col p-4">
	{#each segments as segment}
		{@const cps = getSegmentCps(segment)}
		<div
			class="flex w-full items-center justify-between border-b border-neutral-600 p-4"
			role="button"
			on:click={() => goToVideoSegment(segment.start)}
		>
			<div class="w-24 p-3">
				<p
					class={clsx('text-sm', {
						'text-red-500': cps > MAX_CPS,
						'text-green-500': cps <= MAX_CPS,
					})}
				>
					#CPS: {cps}
				</p>
				<p>{segment.id.toString().padStart(3, '0')}</p>
				<p class="text-sm text-gray-500">{timeCodeParser.fromSeconds(segment.start)}</p>
				<p class="text-sm text-gray-500">{timeCodeParser.fromSeconds(segment.end)}</p>
			</div>
			<div class="w-full text-center">
				<p
					on:click={() => goToVideoSegment(segment.start)}
					class="mx-auto max-w-lg text-balance font-semibold"
					contenteditable="true"
					on:input={(e) => {
						video.updateSegment({ ...segment, text: e.target?.innerText || segment.text });
						console.log({ e });
					}}
				>
					{segment.text}
				</p>
			</div>
		</div>
	{/each}
</div>
