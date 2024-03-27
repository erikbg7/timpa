<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import config from '$lib/config';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import SaasIcon from '$lib/icons/SaasIcon.svelte';
	import clsx from 'clsx';

	let y: number;
	$: isRoute = (path: string) => path === $page.route.id;

	const NAVIGATION_LINKS = config.navbar.list;

	let checked = false;

	const scrollIntoView = (route: string) => (event: MouseEvent) => {
		if (route.startsWith('#')) {
			event.preventDefault();
			if (checked) {
				checked = false;
			}
			if (!isRoute('/')) {
				return goto('/' + route);
			}
			const target = event.target as HTMLAnchorElement;
			const href = target.getAttribute('href')!;
			const el = document.querySelector(href);
			if (!el) return;
			window.scrollTo({
				behavior: 'smooth',
				top: el.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 100,
			});
		}
	};
</script>

<!-- Light navbar -->
<!-- "fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-start border-b border-zinc-300 bg-white px-8" -->

<svelte:window bind:scrollY={y} />
<nav
	class={clsx(
		'fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-start px-8 transition-colors duration-500',
		!!y ? 'border-b border-zinc-400/20 bg-base-100' : 'border-transparent bg-transparent',
	)}
>
	<input bind:checked id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-side bottom-0 top-16">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu h-full w-full gap-4 bg-base-200 p-4 text-neutral-100">
			{#each NAVIGATION_LINKS as link}
				<li>
					<a href={link.href} on:click={scrollIntoView(link.href)} class={' text-2xl font-semibold'}
						>{link.label}</a
					>
				</li>
			{/each}
		</ul>
	</div>

	<div class="mx-auto w-full max-w-screen-xl lg:px-8">
		<div class="flex w-full items-center justify-between">
			<div class="flex items-center">
				<div class="flex-none lg:hidden">
					<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
						<MenuIcon />
					</label>
				</div>
				<a href="/" aria-label={`Return to ${config.appName} homepage`}>
					<!-- <img alt="logo" src="logo.png" class="h-10" /> -->
					<SaasIcon />
				</a>
				<ul class="ml-12 hidden gap-12 text-sm font-semibold text-neutral-100 lg:flex">
					{#each NAVIGATION_LINKS as link}
						<li>
							<a
								href={link.href}
								on:click={scrollIntoView(link.href)}
								class={clsx(
									'transition-all hover:text-primary',
									isRoute(link.href) && 'text-primary',
								)}>{link.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>
			<ul class="flex items-center gap-4 text-neutral-100">
				<li class="hidden lg:block"><a href="/signin">Log In</a></li>
				<li>
					<a href="/signin?mode=signup" class="btn btn-primary btn-sm font-light text-white"
						>Get Started</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
