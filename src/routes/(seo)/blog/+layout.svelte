<script>
	import { onNavigate } from '$app/navigation';
	import DecorationRight from '$ui/decorations/DecorationRight.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<DecorationRight top="top-[0rem]" />
<div class="mx-auto max-w-7xl px-4 py-24 md:px-8">
	<slot />
</div>
