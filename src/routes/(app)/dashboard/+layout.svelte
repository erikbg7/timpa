<script>
	import { enhance } from '$app/forms';
	import SaasIcon from '$lib/icons/SaasIcon.svelte';
	import SparklesIcon from '$lib/icons/SparklesIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import ServerIcon from '$lib/icons/ServerIcon.svelte';
	import WorldIcon from '$lib/icons/WorldIcon.svelte';

	export let data;

	const SIDE_BAR_ITEMS = [
		{
			title: 'AI applications',
			icon: SparklesIcon,
			href: '#',
		},
		{
			title: 'Web apps',
			icon: WorldIcon,
			href: '#',
		},
		{
			title: 'Search',
			icon: SearchIcon,
			href: '#',
		},
		{
			title: 'Serverless apps',
			icon: ServerIcon,
			href: '#',
		},
	];
</script>

<main class="relative inset-0 h-screen w-screen overflow-hidden">
	<div class="dropdown dropdown-end absolute right-4 top-4">
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

	<aside
		class="absoltue inset-y-0 left-0 flex h-screen max-w-56 flex-col gap-4 border-r border-white/10 p-4"
	>
		<SaasIcon />
		<uL class="mt-4 flex flex-col gap-6">
			{#each SIDE_BAR_ITEMS as item}
				<li>
					<a class="flex gap-4" href={item.href}
						><svelte:component this={item.icon} size={'sm'} /> <span>{item.title}</span></a
					>
				</li>
			{/each}
		</uL>
	</aside>
	<section class="absolute left-56 top-16 p-12">
		<slot />
	</section>
</main>
