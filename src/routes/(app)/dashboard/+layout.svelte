<script lang="ts">
	import { enhance } from '$app/forms';
	import SaasIcon from '$lib/icons/SaasIcon.svelte';
	import SparklesIcon from '$lib/icons/SparklesIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import WorldIcon from '$lib/icons/WorldIcon.svelte';
	import PaymentsIcon from '$lib/icons/PaymentsIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import AnalyticsIcon from '$lib/icons/AnalyticsIcon.svelte';

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
			href: '#',
		},
		{
			title: 'How does it work',
			icon: SearchIcon,
			href: '#',
		},
		{
			title: 'Tips',
			icon: SparklesIcon,
			href: '#',
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
	<aside
		class="absoltue inset-y-0 left-0 flex h-screen max-w-56 flex-col justify-between gap-4 border-r border-white/10 p-4"
	>
		<ul class="mt-4 flex flex-col gap-6">
			<SaasIcon />

			{#each SIDE_BAR_APP as item}
				<li>
					<a class="flex gap-4" href={item.href}
						><svelte:component this={item.icon} size={'sm'} /> <span>{item.title}</span></a
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

		<div class="dropdown dropdown-top dropdown-hover">
			<div tabIndex={0} role="button" class="avatar btn btn-circle btn-ghost">
				<div class="w-8 rounded-full border-2 border-green-400">
					<img src={data.session?.user.user_metadata.avatar_url} />
				</div>
			</div>
			<ul
				tabIndex={0}
				class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box border border-white/10 bg-neutral-900 p-2 shadow"
			>
				<li>
					<div class="flex flex-col items-start">
						<span class="text-sm">Signed in as</span>
						<span class="font-semibold">{data.session?.user.user_metadata.full_name}</span>
					</div>
				</li>
				<hr class="my-2 border-white/10" />
				<li>
					<a class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a>Settings</a></li>
				<li>
					<form action="/signin?/signOut" method="POST" use:enhance>
						<button type="submit">Logout</button>
					</form>
				</li>
			</ul>
		</div>
	</aside>
	<slot />
	<!-- <header class="absolute left-56 right-0 top-0 h-20 border-b border-white/10"></header>
	<section class="absolute bottom-0 left-56 right-0 top-16 p-12">
		<slot />
	</section> -->
</main>
