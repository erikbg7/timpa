<script lang="ts">
	import SaasIcon from '$lib/icons/SaasIcon.svelte';
	import SparklesIcon from '$lib/icons/SparklesIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import WorldIcon from '$lib/icons/WorldIcon.svelte';
	import PaymentsIcon from '$lib/icons/PaymentsIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import AnalyticsIcon from '$lib/icons/AnalyticsIcon.svelte';
	import DashboardProfile from '$lib/components/DashboardProfile.svelte';

	export let data;

	const SIDE_BAR_APP = [
		{
			title: 'Workspaces',
			icon: WorldIcon,
			href: '/dashboard',
		},
		{
			title: 'Analytics',
			icon: AnalyticsIcon,
			href: '/dashboard/analytics',
		},
		{
			title: 'How does it work',
			icon: SearchIcon,
			href: '#',
		},
		{
			title: 'Test',
			icon: SparklesIcon,
			href: '/dashboard/test',
		},
	];

	const SIDE_BAR_SETTINGS = [
		{
			title: 'Settings',
			icon: SettingsIcon,
			href: '#',
		},
		{
			title: 'Billing',
			icon: PaymentsIcon,
			href: '/dashboard/billing',
		},
	];
</script>

<main class="relative inset-0 h-screen w-screen overflow-hidden">
	<nav class="absolute left-0 right-0 top-0 h-12 border-b border-white/10">
		<div class="flex h-full items-center justify-between px-4">
			<SaasIcon />
			<div class="flex items-center gap-2">
				<span class="text-sm"><a href="/blog">Blog</a></span>
				<span class="font-extralight opacity-30">|</span>
				<span class="text-sm">Support</span>
				<DashboardProfile
					avatarUrl={data.session?.user.user_metadata.avatar_url}
					fullName={data.session?.user.user_metadata.full_name}
				/>
			</div>
		</div>
	</nav>

	<aside
		class="absolute bottom-0 left-0 top-12 flex h-full w-56 flex-col justify-between gap-4 border-r border-white/10 p-4"
	>
		<ul class="mt-4 flex flex-col gap-6">
			{#each SIDE_BAR_APP as item}
				<li>
					<a class="flex gap-4" href={item.href}
						><svelte:component this={item.icon} size={'sm'} />
						<span class="text-sm">{item.title}</span></a
					>
				</li>
			{/each}
			<hr class="my-2 border-white/10" />
			{#each SIDE_BAR_SETTINGS as item}
				<li>
					<a class="flex gap-4" href={item.href}
						><svelte:component this={item.icon} size={'sm'} /> <span>{item.title}</span></a
					>
				</li>
			{/each}
			<hr class="my-2 border-white/10" />
		</ul>
	</aside>

	<div class=" absolute bottom-0 left-56 right-0 top-12 overflow-y-scroll p-12">
		<slot />
	</div>
</main>
