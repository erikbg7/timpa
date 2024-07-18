<script lang="ts">
	import ArrowLeft from '$lib/ui/icons/ArrowLeft.svelte';
</script>

<nav class="inset-x-0 top-0 bg-base-content/10">
	<div class="flex h-full w-full items-center justify-between p-4">
		<div><button on:click={() => window.history.back()}><ArrowLeft /></button></div>
		<div>
			<div class="dropdown dropdown-left dropdown-bottom">
				<div tabindex="0" role="button" class="btn m-1">Export</div>
				<ul
					tabindex="0"
					class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><a>PDF</a></li>
					<li><a>DOC</a></li>
				</ul>
			</div>
		</div>
	</div>
</nav>
