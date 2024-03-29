<script lang="ts">
	import clsx from 'clsx';

	export let className: string = '';
	export let title: string = '';
</script>

<h1 class={clsx('header-effect font-semibold leading-tight', className)}>
	{#if title}
		{title}
	{:else}
		<slot />
	{/if}
</h1>
