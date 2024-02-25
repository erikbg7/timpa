<script lang="ts">
	import clsx from 'clsx';

	export let title: string = '';
	export let className: string = '';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
</script>

<h2
	class={clsx(
		'header-effect mb-6 font-semibold',
		{
			'text-lg': size === 'sm',
			'text-2xl': size === 'md',
			'text-4xl': size === 'lg',
			'text-5xl': size === 'xl',
		},
		className,
	)}
>
	{#if title}
		{title}
	{:else}
		<slot />
	{/if}
</h2>
