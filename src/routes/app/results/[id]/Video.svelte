<script lang="ts">
	import { currentTime, duration, video } from '$lib/stores/audio-transcription';
	export let url: string | null | undefined;
	$: vttUrl = video.vtt();
</script>

<video
	bind:currentTime={$currentTime}
	bind:duration={$duration}
	src={url || '/catala.mp4'}
	controls
>
	<track kind="captions" src={$vttUrl} srclang="en" label="English" default />
</video>

<style>
	video::-webkit-media-text-track-display {
		font-size: 150%;
	}
</style>
