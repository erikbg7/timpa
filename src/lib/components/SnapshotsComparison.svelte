<script lang="ts">
	import { drawImageToCanvas } from '$lib/screenshot';
	import { afterUpdate, onMount } from 'svelte';

	type ScreenshotComparison = {
		name: string;
		diff: number[];
		reference: string;
		current: string;
	};

	export let data: ScreenshotComparison;

	let baselineCanvas: HTMLCanvasElement;
	let currentCanvas: HTMLCanvasElement;
	$: showScreenShotDiff = true;

	afterUpdate(async () => {
		await drawImageToCanvas(data.reference, baselineCanvas);
		await drawImageToCanvas(data.current, currentCanvas);
		drawSnapshotsDiff();
		showScreenShotDiff = false;
	});

	function drawSnapshotsDiff() {
		// const originalCanvasCtx = currentCanvas?.getContext('2d', { willReadFrequently: true })!;
		// const oCanvasWidth = originalCanvasCtx.canvas.width;
		// originalCanvasCtx.globalCompositeOperation = 'darken';
		// originalCanvasCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
		// originalCanvasCtx.fillRect(0, 0, currentCanvas.width, currentCanvas.height);
		// originalCanvasCtx.globalCompositeOperation = 'lighten';
		// data.diff.forEach((i) => {
		// 	originalCanvasCtx.fillStyle = 'red';
		// 	originalCanvasCtx.fillRect(i % oCanvasWidth, Math.floor(i / oCanvasWidth), 1, 1);
		// });
	}

	async function toggleScreenshotDiff() {
		if (showScreenShotDiff) {
			drawSnapshotsDiff();
		} else {
			drawImageToCanvas(data.current, currentCanvas);
		}
		showScreenShotDiff = !showScreenShotDiff;
	}
</script>

<div class="w-full">
	<div class="grid w-full grid-cols-2 gap-4">
		<div>
			<h5>From Baseline</h5>
			<canvas bind:this={baselineCanvas} class="w-full rounded-md border-4 border-black" />
		</div>
		<div>
			<h5>From commit as637dd</h5>
			<canvas
				bind:this={currentCanvas}
				on:click={toggleScreenshotDiff}
				class="w-full rounded-md border-4 border-black hover:cursor-pointer"
			/>
		</div>
	</div>
</div>
