<script lang="ts" generics="T">
	export let items: T[];
</script>

<li class="flex w-full list-none flex-col gap-4">
	{#each items as item}
		<li>
			<slot {item} />
		</li>
	{/each}
</li>
