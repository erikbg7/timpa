<script lang="ts">
	import { page } from '$app/stores';

	import DashboardSection from '$lib/features/workspaces/components/DashboardSection.svelte';

	import DecorationCard from '$lib/decorations/DecorationCard.svelte';
	import ButtonCheckout from '$lib/components/ButtonCheckout.svelte';
	import config from '$lib/config';
	import { Plan } from '$lib/enums';

	$: console.log({ p: $page.data.props.isCustomer });
</script>

<div>
	{#if $page.data?.props?.plan === Plan.FREE}
		{@const priceId = config.pricing.plans.find((p) => !p.isPro)?.priceId}

		<p class="my-8 text-sm">
			Your are missing out some <a class="text-accent" href="/pricing">key features</a> to discover and
			unlock you true potential.
		</p>
		<div class="relative flex items-center justify-between rounded-md bg-accent-content p-6">
			<DecorationCard />
			<div class="flex gap-4">
				<span class="bg-green-300/20 px-1 text-lg font-semibold text-green-300/90">FREE</span>
				<p>This workspace has limited capabilities and does not support analytics.</p>
			</div>
			<div>
				<!-- @ts-ignore -->
				<ButtonCheckout size="sm" {priceId}>
					<span slot="buttonContent">Upgrade to Standard</span>
				</ButtonCheckout>
			</div>
		</div>
	{/if}
	{#if $page.data?.props?.plan === Plan.STANDARD}
		{@const plan = config.pricing.plans.find((p) => !!p.isPro)}
		<p class="my-8 text-sm">
			Your are missing out some <a href="/pricing">key features</a> to discover and unlock you true potential.
		</p>
		<div class="relative flex items-center justify-between rounded-md bg-accent-content p-6">
			<DecorationCard />
			<div class="flex gap-4">
				<span class="bg-green-300/20 px-1 text-lg font-semibold text-green-300/90">STANDARD</span>
				<p>This workspace has limited capabilities and does not support analytics.</p>
			</div>
			<div>
				<!-- @ts-ignore -->
				<ButtonCheckout size="sm" priceId={plan?.priceId} type={plan?.type}>
					<span slot="buttonContent">Upgrade to Pro</span>
				</ButtonCheckout>
			</div>
		</div>
	{/if}
	{#if $page.data?.props?.plan === Plan.PRO}
		<p class="my-8 text-sm">
			You are on the Pro plan. Enjoy all the features and capabilities of the workspace.
		</p>
		<div class="grid grid-cols-2">
			<div>Workspaces</div>
			<div>Analytics</div>
		</div>
	{/if}
</div>
