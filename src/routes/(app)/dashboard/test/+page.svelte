<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { takeScreenshot } from '$lib/screenshot';

	let input: HTMLInputElement;
	let baselineScreenshot = '';
	let currentScreenshot = '';

	$: header = 'test';

	async function takeBaselineSnapshot() {
		const base64image = await takeScreenshot();
		baselineScreenshot = base64image;
	}

	async function takeRunSnapshot() {
		const base64image = await takeScreenshot();
		currentScreenshot = base64image;
	}

	async function createDiffingRun() {
		const baseUrl = PUBLIC_BASE_URL;
		fetch(`${baseUrl}/api/integration-webhook`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				type: 'snapshot.full.example',
				workspaceId: 'clvfpxtux0003mqypjmwrb10j',
				baselineContent: baselineScreenshot,
				snapshotContent: currentScreenshot,
				name: input.value,
			}),
		});
	}

	async function testSnapshotAddition() {
		const baseUrl = PUBLIC_BASE_URL;
		fetch(`${baseUrl}/api/integration-webhook`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				type: 'snapshot.run.new',
				workspaceId: 'clvfpxtux0003mqypjmwrb10j',
				runId: 'clvl390oe0000ogmckml6w5wa',
				content: 'this is a new screenshot',
				name: 'new screenshot',
			}),
		});
	}
</script>

<button class="rounded-sm border-2 border-black/40 bg-red-400 p-1" on:click={takeBaselineSnapshot}
	>Take baseline snapshot</button
>
<button class="rounded-sm border-2 border-black/40 bg-red-400 p-1" on:click={takeRunSnapshot}
	>Take run snapshot</button
>
<button class="rounded-sm border-2 border-black/40 bg-red-400 p-1" on:click={testSnapshotAddition}
	>Test snapshot addition</button
>

<button
	disabled={!currentScreenshot || !baselineScreenshot}
	class="rounded-sm border-2 border-black/40 bg-red-400 p-1 disabled:opacity-50"
	on:click={createDiffingRun}>Set as reference</button
>

<input bind:this={input} type="text" name="run" placeholder="run id" value="t5" />
<input bind:value={header} type="text" name="run" placeholder="run id" />

<div class="grid w-full grid-cols-2">
	{#if currentScreenshot}
		<img
			alt="screenshot"
			src={currentScreenshot}
			class="mx-auto mt-12 w-[70%] rounded-md border border-purple-500"
		/>
	{/if}
	{#if baselineScreenshot}
		<img
			alt="screenshot"
			src={baselineScreenshot}
			class="mx-auto mt-12 w-[70%] rounded-md border border-purple-500"
		/>
	{/if}
</div>

<section id="test-section" class="p-6">
	<h1 class="text-xl text-red-700">{header}</h1>
</section>
