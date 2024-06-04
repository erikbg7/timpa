<script lang="ts">
	import clsx from 'clsx';

	export let title: string = '';
	export let className: string = '';
	export let viewTransitionName: string = '';
</script>

<h1
	class={clsx('header-effect font-semibold leading-tight', className)}
	style:--title={viewTransitionName}
>
	{#if title}
		{title}
	{:else}
		<slot />
	{/if}
</h1>

<style>
	h1 {
		view-transition-name: var(--title);
	}
</style>
