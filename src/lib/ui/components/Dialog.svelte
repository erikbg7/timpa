<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<dialog bind:this={dialog} on:close class="modal">
	<div class="modal-box bg-purple-950">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>
		<slot />
	</div>
</dialog>
