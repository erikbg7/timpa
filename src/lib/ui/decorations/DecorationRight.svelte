<script lang="ts">
	import clsx from 'clsx';
	export let className: string = '';
	export let top: string = 'top-40';
	export let width: string = 'w-[350px]';
</script>

<svg
	viewBox="0 0 401 800"
	focusable="false"
	class={clsx(
		'absolute right-0 top-40 w-[350px] fill-none text-neutral-100',
		className,
		top,
		width,
	)}
	stroke-width="1"
	stroke-opacity="0.15"
	><path
		d="M400 9.58129C311.459 22.713 212.949 57.3174 113.439 127.06C-118.308 289.483 177.989 599.371 400 791"
		stroke="currentColor"
		stroke-linecap="round"
	></path><path
		d="M400 89.0232C345.416 104.301 287.276 130.234 229.009 170.974C54.3128 293.12 229.643 524.813 400 681.744"
		stroke="currentColor"
		stroke-linecap="round"
	></path><path
		d="M400 208.575C381.53 217.903 363.328 229.033 344.539 242.213C238.488 316.602 303.637 444.613 400 553.5"
		stroke="currentColor"
		stroke-linecap="round"
	></path></svg
>
