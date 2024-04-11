<script lang="ts">
	import clsx from 'clsx';
	import config from '$lib/config';
	import DecorationRight from '$lib/decorations/DecorationRight.svelte';
	import ButtonCheckout from './ButtonCheckout.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="pricing" class="overflow-hidden">
	<SectionHeader title={config.pricing.title} description={config.pricing.description} />

	<div class="mx-auto max-w-5xl px-8">
		<div
			class="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch"
		>
			{#each Object.values(config.pricing.plans) as plan}
				<div class="relative w-full max-w-lg">
					{#if plan.isFeatured}
						<div class="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
							<span
								class={`rounded-full border-0 bg-primary px-2 py-1 text-xs font-semibold text-white`}
							>
								POPULAR
							</span>
						</div>

						<div class={`absolute -inset-[1px] z-10 rounded-[9px] bg-primary`}></div>
					{/if}

					<div
						class={clsx(
							'relative z-10 flex h-full flex-col gap-5 overflow-hidden rounded-lg bg-accent-content p-8 lg:gap-8',
							plan.isFeatured ? 'border-2 border-primary' : 'border border-zinc-500',
						)}
					>
						<DecorationRight className="z-20" />

						<div class="flex items-center justify-between gap-4">
							<div>
								<p class="text-lg font-bold lg:text-xl">{plan.name}</p>
								{#if plan.description}
									<p class="mt-2 text-base-content/80">
										{plan.description}
									</p>
								{/if}
							</div>
						</div>
						<div class="flex gap-2">
							{#if plan.priceAnchor}
								<div class="mb-[4px] flex flex-col justify-end text-lg">
									<p class="text-base-content/80 line-through">
										${plan.priceAnchor}
									</p>
								</div>
							{/if}
							<p class={`text-5xl font-extrabold tracking-tight`}>
								${plan.price}
							</p>
							<div class="mb-[4px] flex flex-col justify-end">
								<p class="text-xs font-semibold uppercase text-base-content/60">USD</p>
							</div>
						</div>
						{#if plan.features}
							<ul class="flex-1 space-y-2.5 text-base leading-relaxed">
								{#each plan.features as feature, i}
									<li class="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="h-[18px] w-[18px] shrink-0 opacity-80"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>

										<span>{feature.name} </span>
									</li>
								{/each}
							</ul>
						{/if}
						<div class="relative z-30 space-y-2">
							<ButtonCheckout plan={plan.type} />

							<p
								class="relative flex items-center justify-center gap-2 text-center text-sm font-medium text-base-content/80"
							>
								Pay once. Access forever.
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
