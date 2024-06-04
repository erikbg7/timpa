<script lang="ts">
	import H2 from '$ui/atoms/H2.svelte';
	import ListBullet from '$ui/atoms/ListBullet.svelte';
	import Paragraph from '$ui/atoms/Paragraph.svelte';
	import DecorationBanner from '$ui/decorations/DecorationBanner.svelte';

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
	<!-- <ul>
		{#each BANNER_FEATURES.filter(({sites}) => sites.length < 80) as structure}
		  {@const { id } = structure}
		  {@const href = `https://materialsproject.org/materials/${id}`}
		  <li>
			<h2><a {href}>{id}</a></h2>
			<Structure {structure} />
		  </li>
		{/each}
	  </ul> -->
	<div
		class="relative mx-2 overflow-hidden rounded-3xl border-8 border-neutral-900 bg-neutral-900 lg:mx-10"
	>
		<div
			class="relative flex flex-col justify-between rounded-lg bg-banner p-4 lg:flex-row lg:p-24"
		>
			<DecorationBanner />
			<div class="relative flex max-w-lg flex-col gap-8">
				<h2 class="text-2xl font-semibold text-neutral-100 lg:text-4xl">
					Start free, pay as you grow
				</h2>
				<p class="no-aliasing text-md text-white lg:text-lg">
					Xata provides the best free plan in the industry. It is production ready by default and
					doesn't pause or cool-down. Take your time to build your business and upgrade when you're
					ready to scale.
				</p>
				<div class="hidden gap-4 lg:flex">
					<button class="text-md btn btn-primary w-40">Start Free</button>
					<button class="text-md bg- btn btn-secondary w-40">How It Works</button>
				</div>
			</div>
			<div class="relative my-8 lg:my-0">
				<span
					class="bg-green-300/20 px-[0.2rem] py-[0.1rem] text-xs font-semibold uppercase text-green-300/90"
					>free plan includes</span
				>
				<ul class="mt-4">
					{#each BANNER_FEATURES as feature}
						<li class="lg:text-md flex items-center gap-3 py-1 text-sm font-light text-neutral-200">
							<ListBullet size="sm" status="success" />
							{feature}
						</li>
					{/each}
				</ul>
			</div>
			<button class="text-md btn btn-primary btn-block relative lg:hidden">Start Free</button>
		</div>
	</div>
</section>
