<script lang="ts">
	import clsx from 'clsx';

	export let title: string = '';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
</script>

<h3
	class={clsx('mb-4 font-semibold', {
		'text-lg': size === 'sm',
		'text-2xl': size === 'md',
		'text-3xl': size === 'lg',
		'text-4xl': size === 'xl',
	})}
>
	{#if title}
		{title}
	{:else}
		<slot />
	{/if}
</h3>
