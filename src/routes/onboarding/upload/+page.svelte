<script lang="ts">
	import { goto } from '$app/navigation';
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
				goto('/app/results');
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

		Noice video
		<video bind:duration src={url} controls></video>
		<button
			on:click={handleFileSubmit}
			disabled={submitting}
			class="btn btn-primary btn-sm mt-4"
			type="submit"
			>Submit {#if submitting}<span class="loading loading-spinner loading-xs ml-2"></span>
			{/if}</button
		>
	{:else}
		<h1 class="mb-6 text-4xl font-bold">Let's upload your file</h1>
		<label class="btn btn-primary form-control btn-lg btn-block">
			<div class="label">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
				>
					<path
						d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
						stroke="currentColor"
						stroke-width="1.67"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</svg>
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
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
				><g clip-path="url(#clip0_2032_10607)"
					><path
						d="M8.33338 10.8332C8.69125 11.3117 9.14784 11.7075 9.67217 11.994C10.1965 12.2805 10.7763 12.4508 11.3723 12.4935C11.9682 12.5362 12.5664 12.4502 13.1262 12.2414C13.686 12.0326 14.1943 11.7058 14.6167 11.2832L17.1167 8.78322C17.8757 7.99738 18.2957 6.94487 18.2862 5.85238C18.2767 4.7599 17.8385 3.71485 17.066 2.94231C16.2934 2.16978 15.2484 1.73157 14.1559 1.72208C13.0634 1.71259 12.0109 2.13256 11.225 2.89156L9.79171 4.31656M11.6667 9.16656C11.3088 8.68811 10.8522 8.29224 10.3279 8.00577C9.80359 7.71931 9.22379 7.54896 8.62784 7.50628C8.03188 7.4636 7.43372 7.54958 6.87392 7.7584C6.31412 7.96723 5.80578 8.294 5.38338 8.71656L2.88338 11.2166C2.12439 12.0024 1.70441 13.0549 1.7139 14.1474C1.7234 15.2399 2.1616 16.2849 2.93413 17.0575C3.70667 17.83 4.75172 18.2682 5.84421 18.2777C6.93669 18.2872 7.9892 17.8672 8.77504 17.1082L10.2 15.6832"
						stroke="#667085"
						stroke-width="1.66667"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path></g
				><defs
					><clipPath id="clip0_2032_10607"
						><rect width="20" height="20" fill="white"></rect></clipPath
					></defs
				></svg
			>
			<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> -->
			<input
				bind:value={publicUrl}
				type="text"
				class="grow"
				placeholder="Paste a public link from Youtube, Google Drive, etc."
			/>
		</label>
	{/if}
</div>
