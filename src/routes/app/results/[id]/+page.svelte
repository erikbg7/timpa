<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { trpc } from '$lib/trpc';
	import Chronogram from './Chronogram.svelte';
	import Subtitles from './Subtitles.svelte';
	import Video from './Video.svelte';
	import Audio from './Audio.svelte';
	import { audio } from '$lib/stores/audio-transcription';
	import Transcription from './Transcription.svelte';
	import NavBar from './NavBar.svelte';
	import DashboardSection from '$lib/ui/components/DashboardSection.svelte';

	const fileId = $page.params.id;
	const refetchOptions = { refetchOnWindowFocus: false };

	const file = trpc.files.get.query({ id: fileId });
	const fileUrl = trpc.files.getUrl.query({ id: fileId }, refetchOptions);

	$: if ($file.data) {
		audio.init({
			duration: 185,
			currentTime: 0,
			language: 'en',
			segments: $file.data.prediction?.segments || [],
			transcription: $file.data.prediction?.transcription || '',
		});
	}
</script>

<DashboardSection title={$file.data?.name || ''}>
	<button slot="action" class="btn btn-primary btn-sm" on:click={() => {}}> Export </button>
	<div slot="content">
		{#if $file.data}
			<main class="grid-container h-screen w-screen">
				<section class="subtitles bg---red-500 h-full overflow-scroll">
					<Transcription />
				</section>
				<section class="video bg---green-500">
					<Audio url={$fileUrl.data?.url} />
				</section>
				<section class="bottom bg---yellow-500">
					<!-- <Chronogram /> -->
				</section>
			</main>
		{:else}
			<div>No file</div>
		{/if}
	</div>
</DashboardSection>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			'subtitles subtitles subtitles video video'
			'subtitles subtitles subtitles video video'
			'subtitles subtitles subtitles video video'
			'subtitles subtitles subtitles video video'
			'bottom bottom bottom bottom bottom';
	}

	.bottom {
		grid-area: bottom;
	}

	.video {
		grid-area: video;
	}

	.subtitles {
		grid-area: subtitles;
	}
</style>
