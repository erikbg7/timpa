<script lang="ts">
	import { currentTime, duration, autoplay } from '$lib/stores/audio-transcription';
	export let url: string | null | undefined;

	let audio: HTMLAudioElement;

	$: {
		audio && audio.play();
	}
</script>

<audio
	bind:this={audio}
	bind:currentTime={$currentTime}
	bind:duration={$duration}
	autoplay={false}
	src={url || '/catala.mp4'}
	muted={true}
	controls
/>
<ul class="menu rounded-box bg-base-200 lg:menu-horizontal">
	<li>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text mr-3">Autoplay</span>
				<input
					type="checkbox"
					name="radio-10"
					class="radio checked:bg-green-500"
					on:change={(e) => {
						autoplay.update((prev) => !prev);
						// e.target?.checked ? audio.play() : audio.pause();
					}}
					bind:checked={$autoplay}
				/>
			</label>
		</div>
	</li>
	<li>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text mr-3" on:click={() => (audio.playbackRate = 1.5)}>x 1.5</span>
			</label>
		</div>
	</li>
</ul>
