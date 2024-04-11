<script lang="ts">
	import DecorationCard from '$lib/decorations/DecorationCard.svelte';
	import ButtonCheckout from '$lib/components/ButtonCheckout.svelte';
	import { Plan } from '$lib/enums';

	export let data;

	$: customerPlan = data.customer?.plan;
</script>

<div>
	{#if customerPlan === Plan.FREE}
		<p class="my-8 text-sm">
			Your are missing out some <a class="text-accent" href="/pricing">key features</a> to discover and
			unlock you true potential.
		</p>
		<div class="relative flex items-center justify-between rounded-md bg-accent-content p-6">
			<DecorationCard />
			<div class="flex gap-4">
				<span class="bg-green-300/20 px-1 text-lg font-semibold text-green-300/90">{Plan.FREE}</span
				>
				<p>This workspace has limited capabilities and does not support analytics.</p>
			</div>
			<div>
				<ButtonCheckout size="sm" plan={Plan.STANDARD}>
					<span slot="buttonContent">Upgrade to Standard</span>
				</ButtonCheckout>
			</div>
		</div>
	{/if}
	{#if customerPlan === Plan.STANDARD}
		<p class="my-8 text-sm">
			Your are missing out some <a href="/pricing">key features</a> to discover and unlock you true potential.
		</p>
		<div class="relative flex items-center justify-between rounded-md bg-accent-content p-6">
			<DecorationCard />
			<div class="flex gap-4">
				<span class="bg-amber-300/20 px-1 text-lg font-semibold text-amber-300/90"
					>{Plan.STANDARD}</span
				>
				<p>This workspace has limited capabilities and does not support analytics.</p>
			</div>
			<div>
				<ButtonCheckout size="sm" plan={Plan.PRO}>
					<span slot="buttonContent">Upgrade to Pro</span>
				</ButtonCheckout>
			</div>
		</div>
	{/if}
	{#if customerPlan === Plan.PRO}
		<p class="my-8 text-sm">
			You are on the Pro plan. Enjoy all the features and capabilities of the workspace.
		</p>
		<div class="grid grid-cols-2">
			<div>Workspaces</div>
			<div>Analytics</div>
		</div>
	{/if}
</div>
