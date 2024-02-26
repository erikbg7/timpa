<script lang="ts">
	import H2 from '$lib/atoms/H2.svelte';
	import ListBullet from '$lib/atoms/ListBullet.svelte';
	import Paragraph from '$lib/atoms/Paragraph.svelte';
	import DecorationBanner from '$lib/decorations/DecorationBanner.svelte';

	const BANNER_FEATURES = [
		'10 database branches',
		'High availability',
		'Support-assisted daily backups',
		'15GB data storage',
		'15GB search engine storage',
		'2GB file attachments',
		'250 AI queries per month',
	];
</script>

<section class="mx-auto max-w-7xl">
	<div
		class="relative mx-10 overflow-hidden rounded-3xl border-8 border-neutral-900 bg-neutral-900"
	>
		<div class="bg-banner relative flex justify-between rounded-lg p-24">
			<DecorationBanner />
			<div class="relative flex max-w-lg flex-col gap-8">
				<h2 class="text-4xl font-semibold text-neutral-100">Start free, pay as you grow</h2>
				<p class="no-aliasing text-lg text-white">
					Xata provides the best free plan in the industry. It is production ready by default and
					doesn't pause or cool-down. Take your time to build your business and upgrade when you're
					ready to scale.
				</p>
				<div class="flex gap-4">
					<button class="text-md btn btn-primary w-40">Start Free</button>
					<button class="text-md bg- btn btn-secondary w-40">How It Works</button>
				</div>
			</div>
			<div class="relative">
				<span
					class="bg-green-300/20 px-[0.2rem] py-[0.1rem] text-xs font-semibold uppercase text-green-300/90"
					>free plan includes</span
				>
				<ul class="mt-4">
					{#each BANNER_FEATURES as feature}
						<li class="text-md flex items-center gap-3 py-1 font-light text-neutral-200">
							<ListBullet size="sm" status="success" />
							{feature}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
