<script lang="ts">
	import clsx from 'clsx';

	export let title: string = '';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
</script>

<h1
	class={clsx('header-effect mb-8 font-semibold leading-tight', {
		'text-xl': size === 'sm',
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
