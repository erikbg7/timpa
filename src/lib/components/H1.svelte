<script lang="ts">
	import clsx from 'clsx';

	export let title: string = '';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
</script>

<h1
	class={clsx('signup-title mb-8 text-7xl font-semibold leading-tight text-neutral-700', {
		'text-lg': size === 'sm',
		'text-2xl': size === 'md',
		'text-4xl': size === 'lg',
		'text-7xl': size === 'xl',
	})}
>
	{#if title}
		{title}
	{:else}
		<slot />
	{/if}
</h1>
