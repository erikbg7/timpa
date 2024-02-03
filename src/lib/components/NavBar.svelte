<script lang="ts">
	import { page } from '$app/stores';
	import config from '$lib/config';
	import clsx from 'clsx';

	$: isRoute = (path: string) => path === $page.route.id;
</script>

<nav
	class="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-start border-b border-zinc-300 bg-white px-8"
>
	<div class="mx-auto w-full max-w-screen-xl px-8">
		<div class="flex w-full items-center justify-between">
			<a href="/" aria-label={`Return to ${config.appName} homepage`}>
				<img alt="logo" src="logo.png" class="h-10" />
			</a>
			<ul class="flex gap-12 font-semibold">
				<li>
					<a
						href="/product"
						class={clsx('transition-all hover:text-primary', isRoute('/product') && 'text-primary')}
						>Product</a
					>
				</li>
				<li>
					<a
						href="/pricing"
						class={clsx('transition-all hover:text-primary', isRoute('/pricing') && 'text-primary')}
						>Pricing</a
					>
				</li>
				<li>
					<a
						href="/testimonials"
						class={clsx(
							'transition-all hover:text-primary',
							isRoute('/testimonials') && 'text-primary',
						)}>Testimonials</a
					>
				</li>
				<li>
					<a
						href="/about"
						class={clsx('transition-all hover:text-primary', isRoute('/about') && 'text-primary')}
						>About Us</a
					>
				</li>
			</ul>
			<ul class="flex items-center gap-4">
				<li><a href="/login">Log In</a></li>
				<li>
					<a href="/login" class="btn btn-primary btn-sm font-light text-white">Get Started</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
