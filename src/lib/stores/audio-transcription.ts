// import { toVtt } from '$lib/srt';
import type { Segment } from '@prisma/client';
import { derived, writable } from 'svelte/store';

type AudioSubtitles = {
	duration: number;
	currentTime: number;
	language: string;
	segments: Segment[];
	transcription: string;
};

const initialState: AudioSubtitles = {
	duration: 0,
	currentTime: 0,
	language: '',
	segments: [],
	transcription: '',
};

function createVideo() {
	const { subscribe, set, update } = writable<AudioSubtitles>(initialState);

	return {
		subscribe,
		segment: (id: number) => derived(video, ($video) => $video.segments.find((s) => s.id === id)),
		vtt: () =>
			derived(video, ($video) => {
				// const res = toVtt($video.segments);
				// const url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(res);
				// return url;
			}),
		setCurrentTime: (time: number) => update((n) => ({ ...n, currentTime: n.currentTime + time })),
		incrementCurrentTime: (time: number) =>
			update((n) => ({ ...n, currentTime: n.currentTime + time })),
		updateSegment: (segment: Segment) =>
			update((n) => {
				const newSegments = n.segments.map((s) => (s.id === segment.id ? segment : s));
				return { ...n, segments: newSegments };
			}),
		reset: () => set(initialState),
		init: (data: AudioSubtitles) => set(data),
	};
}

function createAudio() {
	const { subscribe, set, update } = writable<AudioSubtitles>(initialState);

	return {
		subscribe,
		segment: (id: number) => derived(video, ($video) => $video.segments.find((s) => s.id === id)),
		vtt: () =>
			derived(video, ($video) => {
				// const res = toVtt($video.segments);
				// const url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(res);
				// return url;
			}),
		setCurrentTime: (time: number) => update((n) => ({ ...n, currentTime: n.currentTime + time })),
		incrementCurrentTime: (time: number) =>
			update((n) => ({ ...n, currentTime: n.currentTime + time })),
		updateSegment: (segment: Segment) =>
			update((n) => {
				const newSegments = n.segments.map((s) => (s.id === segment.id ? segment : s));
				return { ...n, segments: newSegments };
			}),
		reset: () => set(initialState),
		init: (data: AudioSubtitles) => set(data),
	};
}

export const video = createVideo();
export const audio = createAudio();

export const currentTime = writable<number>(0);
export const duration = writable<number>(0);
export const autoplay = writable<boolean>(false);
