<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/ui/components/Card.svelte';
	import LinkIcon from '$lib/ui/icons/LinkIcon.svelte';
	import UploadIcon from '$lib/ui/icons/UploadIcon.svelte';
	import { toast } from 'svelte-sonner';

	let publicUrl: string | null = null;
	let files: FileList | null = null;
	let submitting: boolean = false;
	$: submitting;

	let duration: number = 0;

	function handleFileSubmit() {
		const file = files?.[0];
		if (!file || !duration) return;

		const formData = new FormData();
		formData.append('file', file);
		formData.append('duration', duration.toString());

		fetch('/api/prediction', {
			method: 'POST',
			body: formData,
		})
			.then(async (res) => {
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				toast.success('New transcription created', {
					description: 'Your results will be ready in a few minutes',
				});
				goto('/app');
			})
			.catch((err) => {
				toast.error('Cannot create transcription', {
					description: 'Please try again later',
				});
			});
	}
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center pb-36">
	{#if publicUrl}
		<video bind:duration src={publicUrl} controls></video>
		<form>
			<input
				type="number"
				bind:value={duration}
				placeholder="Duration in seconds"
				name="duration"
				class="form-control hidden"
			/>
			<button disabled={submitting} class="btn btn-primary btn-sm mt-4" type="submit">
				Submit
				{#if submitting}
					<span class="loading loading-spinner loading-xs ml-2"></span>
				{/if}
			</button>
		</form>
	{:else if files?.[0]}
		{@const url = URL.createObjectURL(files[0])}
		{@const size = files[0].size}
		{@const name = files[0].name}

		<Card>
			Noice video
			<h2>{name}</h2>
			<h2>{size}</h2>
			<video bind:duration src={url} controls></video>
			<button
				on:click={handleFileSubmit}
				disabled={submitting}
				class="btn btn-primary btn-sm mt-4"
				type="submit"
				>Submit {#if submitting}<span class="loading loading-spinner loading-xs ml-2"></span>
				{/if}</button
			>
		</Card>
	{:else}
		<h1 class="mb-6 text-4xl font-bold">Let's upload your file</h1>
		<label class="btn btn-primary form-control btn-lg btn-block">
			<div class="label">
				<UploadIcon iconClass="mr-2" />
				Upload a file
			</div>
			<input
				bind:files
				required
				class="hidden"
				accept=".mp4,.mp3,.wav"
				id="video"
				name="file"
				type="file"
				multiple={false}
			/>
		</label>

		<div class="divider my-8">OR</div>

		<label class="input input-bordered flex w-full items-center gap-2">
			<LinkIcon />
			<input
				bind:value={publicUrl}
				type="text"
				class="grow"
				placeholder="Paste a public link from Youtube, Google Drive, etc."
			/>
		</label>
	{/if}
</div>
