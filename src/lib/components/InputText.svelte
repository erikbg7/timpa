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
	class={clsx('input input-bordered w-full', {
		'input-error': error,
	})}
/>
{#if error}
	<p class="mt-1 text-xs text-red-500">{error}</p>
{/if}
