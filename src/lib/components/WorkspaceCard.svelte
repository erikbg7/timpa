<script lang="ts">
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import type { File } from '@prisma/client';
	import SecureVideo from './SecureVideo.svelte';
	import { trpc } from '$lib/trpc';

	export let wp: File;
	export let accessToken: string;
	const deleteFile = trpc.files.delete.mutation({
		onSuccess: () => {
			trpc.files.list.utils.invalidate();
		},
	});

	console.log({ wp });

	// const invalidator = {
	// 	onSuccess: () => {
	// 		trpc.todos.list.utils.invalidate();
	// 	},
	// };
	// const addTodo = trpc.todos.add.mutation(invalidator);
	// const updateTodo = trpc.todos.update.mutation(invalidator);
	// const deleteTodo = trpc.todos.delete.mutation(invalidator);
</script>

<div class="relative rounded-md border border-white/10 bg-accent-content p-4">
	<button
		class="absolute right-2 top-2 cursor-pointer"
		disabled={$deleteFile.isPending}
		on:click={() => {
			$deleteFile.mutateAsync({ id: wp.id });
		}}
	>
		{#if $deleteFile.isPending}
			<span class="loading loading-spinner loading-xs"></span>
		{:else}
			<TrashIcon iconClass="size-4 hover:text-red-500" />
		{/if}
	</button>

	<h4><strong>{wp.name}</strong></h4>
	<div class="p-3">
		<SecureVideo privateUrl={wp.url} {accessToken} />
	</div>
	<div class="flex flex-col">
		<p class="flex justify-between"><b>Flow Time:</b> <span>45min</span></p>
	</div>
</div>
