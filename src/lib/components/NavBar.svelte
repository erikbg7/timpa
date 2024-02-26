<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import config from '$lib/config';
	import clsx from 'clsx';

	let y: number;
	$: isRoute = (path: string) => path === $page.route.id;

	const NAVIGATION_LINKS = config.navbar.list;

	const scrollIntoView = (route: string) => (event: MouseEvent) => {
		if (route.startsWith('#')) {
			event.preventDefault();
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
		'fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-start px-8 transition-colors duration-500',
		!!y ? 'border-b border-zinc-400/20 bg-base-100' : 'border-transparent bg-transparent',
	)}
>
	<div class="mx-auto w-full max-w-screen-xl px-8">
		<div class="flex w-full items-center justify-between">
			<div class="flex items-center">
				<a href="/" aria-label={`Return to ${config.appName} homepage`}>
					<!-- <img alt="logo" src="logo.png" class="h-10" /> -->
					<svg
						viewBox="0 0 24 24"
						focusable="false"
						class="chakra-icon css-n5gr1q size-6"
						aria-hidden="true"
						><g
							><path
								fill="url(#xataLogoHeaderGdTopLeft)"
								d="M0.50001 6.60213C0.50267 8.8784 1.41054 11.0604 3.02388 12.6681L8.74744 18.3712C8.94576 18.5689 9.26796 18.5694 9.45379 18.36C10.8453 16.792 11.6185 14.7641 11.6161 12.6571C11.6134 10.3808 10.7055 8.19885 9.09219 6.59116L3.863 1.38063C3.39169 0.91097 2.6205 0.9076 2.2208 1.43942C1.10825 2.91967 0.49781 4.72971 0.50001 6.60213Z"
							></path><path
								fill="url(#xataLogoHeaderGdTopRight)"
								d="M20.9762 12.6339C22.5896 11.0262 23.4974 8.84422 23.5001 6.56795C23.5023 4.69553 22.8919 2.88549 21.7793 1.40524C21.3796 0.87342 20.6084 0.87679 20.1371 1.34645L14.9081 6.55711C13.2948 8.1648 12.3867 10.3466 12.384 12.6229C12.3816 14.7298 13.1548 16.7578 14.5463 18.3258C14.7321 18.5352 15.0543 18.5346 15.2527 18.337L20.9762 12.6339Z"
							></path><path
								fill="url(#xataLogoHeaderGdBottomRight)"
								d="M19.1009 22.914C19.5712 23.3849 20.3403 23.3894 20.7607 22.8736C21.9251 21.4455 22.7 19.7984 22.9533 18.1782C23.2301 16.408 22.864 14.8001 21.9329 13.6368C21.758 13.4182 21.4346 13.4193 21.2363 13.617L15.8719 18.9625C15.6732 19.1605 15.6729 19.482 15.871 19.6804L19.1009 22.914Z"
							></path><path
								fill="url(#xataLogoHeaderGdBottomLeft)"
								d="M3.23951 22.9088C3.65998 23.4245 4.42907 23.42 4.89936 22.9492L8.12918 19.7156C8.32737 19.5172 8.32699 19.1956 8.12834 18.9977L2.76398 13.6521C2.56566 13.4545 2.24224 13.4533 2.0673 13.6719C1.13627 14.8353 0.77018 16.4432 1.04694 18.2133C1.30027 19.8336 2.07513 21.4807 3.23951 22.9088Z"
							></path></g
						><defs
							><linearGradient
								id="xataLogoHeaderGdTopLeft"
								x1="12"
								x2="12"
								y1="1"
								y2="18.701"
								gradientUnits="userSpaceOnUse"
								><stop stop-color="#9F87FF"></stop><stop offset="1" stop-color="#8566FF"
								></stop></linearGradient
							><linearGradient
								id="xataLogoHeaderGdBottomLeft"
								x1="12"
								x2="12"
								y1="13.251"
								y2="23.264"
								gradientUnits="userSpaceOnUse"
								><stop stop-color="#DE99F6"></stop><stop offset="1" stop-color="#D669FC"
								></stop></linearGradient
							><linearGradient
								id="xataLogoHeaderGdTopRight"
								x1="12"
								x2="12"
								y1="1"
								y2="18.701"
								gradientUnits="userSpaceOnUse"
								><stop stop-color="#9F87FF"></stop><stop offset="1" stop-color="#8566FF"
								></stop></linearGradient
							><linearGradient
								id="xataLogoHeaderGdBottomRight"
								x1="12"
								x2="12"
								y1="13.251"
								y2="23.264"
								gradientUnits="userSpaceOnUse"
								><stop stop-color="#DE99F6"></stop><stop offset="1" stop-color="#D669FC"
								></stop></linearGradient
							></defs
						></svg
					>
				</a>
				<ul class="ml-12 flex gap-12 text-sm font-semibold text-neutral-100">
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
				<li><a href="/login">Log In</a></li>
				<li>
					<a href="/login" class="btn btn-primary btn-sm font-light text-white">Get Started</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
