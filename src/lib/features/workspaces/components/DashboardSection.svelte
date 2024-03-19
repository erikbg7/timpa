<script lang="ts">
	export let title: string;
</script>

<header class="absolute left-56 right-0 top-0 h-20 border-b border-white/10">
	<div class="flex h-full w-full items-center justify-between px-6 py-6">
		<h2 class="text-lg font-light">{title}</h2>
		<slot name="action" />
	</div>
</header>
<section class="absolute bottom-0 left-56 right-0 top-16 p-12">
	<slot name="content" />
</section>
