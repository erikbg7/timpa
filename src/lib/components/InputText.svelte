<script lang="ts">
	import clsx from 'clsx';

	export let name: string;
	export let placeholder: string;
	export let error: string | undefined = undefined;
</script>

<input
	{name}
	{placeholder}
	type="text"
	class={clsx('w-full rounded-md border  p-3 text-lg', {
		'border-red-500': error,
		'border-zinc-200': !error,
	})}
/>
{#if error}
	<p class="mt-1 text-xs text-red-500">{error}</p>
{/if}
