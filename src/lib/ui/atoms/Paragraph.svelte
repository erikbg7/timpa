<script lang="ts">
	import clsx from 'clsx';

	export let title: string = '';
	export let className: string = '';
	export let viewTransitionName: string = '';
</script>

<p
	class={clsx('mb-8 text-lg leading-relaxed tracking-wide', className)}
	style:--paragraph={viewTransitionName}
>
	{#if title}
		{title}
	{:else}
		<slot />
	{/if}
</p>

<style>
	p {
		view-transition-name: var(--paragraph);
	}
</style>
