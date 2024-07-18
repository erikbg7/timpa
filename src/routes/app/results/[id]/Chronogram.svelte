<script lang="ts">
	import clsx from 'clsx';
	import { TimeCodeParser } from '$lib/srt';
	import { video, currentTime, duration } from '$lib/stores/audio-transcription';

	$: segments = $video.segments;

	const timeCodeParser = new TimeCodeParser('srt', { withMilliseconds: false });

	function handleScrollChange(event: Event) {
		const target = event.target as HTMLElement;
		const percentage = target.scrollLeft / (target.scrollWidth - target.clientWidth);
		if (!video) return;
		currentTime.set($duration * percentage);
	}

	function goToVideoTime(timestamp: number) {
		currentTime.set(timestamp);
	}
	// $: element2 = null
	// $: console.log({ element2 })

	let offsetWidth: number;
	$: offsetWidth;
	// offsetWidth

	$: console.log({ $duration });
</script>

<!-- <div on:scroll={handleScrollChange} class="w-full overflow-x-scroll h-full">
	<div class="w-max h-full flex items-center">
		{#each segments as segment}
			<p
				on:click={() => goToVideoSegment(segment.start)}
				class="inline-block font-semibold p-3 rounded-md bg-neutral-700 mr-2"
			>
				{segment.text}
			</p>
		{/each}
	</div>
</div> -->

<div class="h-full w-full">
	<div class="fixed left-[50%] z-20 h-full w-1 bg-green-400"></div>
	<div on:scroll={handleScrollChange} class="relative h-full w-full overflow-x-scroll">
		<div bind:offsetWidth class="absolute left-[50%] right-0 top-0 flex w-max items-center">
			{#each { length: Math.floor($duration) } as _, i}
				<p
					on:click={() => goToVideoTime(i)}
					class="inline-block w-24 rounded-md bg-neutral-700 p-3 text-center text-sm font-semibold"
				>
					{timeCodeParser.fromSeconds(i)}
				</p>
			{/each}
		</div>
		<div class={clsx(`relative left-[50%] right-0 mt-12`)} style={`width: ${offsetWidth}px;`}>
			{#each segments as segment}
				<div
					on:click={() => goToVideoTime(segment.start)}
					style={`left: ${(segment.start / $duration) * offsetWidth}px; right: ${
						offsetWidth - (segment.end / $duration) * offsetWidth
					}px;`}
					class={clsx('absolute rounded-md bg-neutral-700 p-3 font-semibold')}
				>
					<div class="text-xs">
						{segment.text}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- <div on:scroll={handleScrollChange} class="w-full overflow-x-scroll h-full">
		<div class="w-max h-full flex items-center relative left-[50%]">
			{#each segments as segment}
				<p
					on:click={() => goToVideoSegment(segment.start)}
					class="inline-block font-semibold p-3 rounded-md bg-neutral-700 mr-2"
				>
					{segment.text}
				</p>
			{/each}
		</div>
	</div> -->
</div>
