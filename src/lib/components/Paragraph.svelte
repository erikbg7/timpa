<script lang="ts">
	export let title: string = '';
</script>

<p class="mb-8 text-lg leading-relaxed tracking-wide">
	{#if title}
		{title}
	{:else}
		<slot />
	{/if}
</p>
