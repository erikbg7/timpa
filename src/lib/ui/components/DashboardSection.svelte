<script lang="ts">
	export let title: string;
</script>

<header>
	<div class="mb-6 flex h-full w-full items-center justify-between px-6">
		<h2 class="text-lg font-light">{title}</h2>
		<slot name="action" />
	</div>
</header>
<section class="overflow-y-scroll p-6">
	<slot name="content" />
</section>
