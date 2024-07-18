<script lang="ts">
	import clsx from 'clsx';
	import type { Segment } from '@prisma/client';
	import { currentTime, audio } from '$lib/stores/audio-transcription';
	import { TimeCodeParser } from '$lib/srt';

	$: isSegmentPlaying = (segment: Segment) => {
		return $currentTime >= segment.start && $currentTime <= segment.end;
	};

	function goToVideoSegment(timestamp: number) {
		currentTime.set(timestamp);
	}

	$: segments = $audio.segments;
</script>

<div class="flex w-full flex-col p-4">
	<div class="w-full text-center">
		{#each segments as segment}
			<span
				on:focus={() => goToVideoSegment(segment.start)}
				class={clsx('mx-auto max-w-lg text-balance font-semibold', {
					'bg-purple-700': isSegmentPlaying(segment),
				})}
				contenteditable="true"
				on:input={(e) => {
					audio.updateSegment({ ...segment, text: e.target?.innerText || segment.text });
					console.log({ e });
				}}
			>
				{segment.text}
			</span>
		{/each}
	</div>
</div>
