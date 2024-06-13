<script lang="ts">
	import { trpc } from '$lib/trpc';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import SaasIcon from '$ui/icons/SaasIcon.svelte';
	import SparklesIcon from '$ui/icons/SparklesIcon.svelte';
	import SearchIcon from '$ui/icons/SearchIcon.svelte';
	import WorldIcon from '$ui/icons/WorldIcon.svelte';
	import PaymentsIcon from '$ui/icons/PaymentsIcon.svelte';
	import SettingsIcon from '$ui/icons/SettingsIcon.svelte';
	import AnalyticsIcon from '$ui/icons/AnalyticsIcon.svelte';
	import DashboardProfile from '$ui/components/DashboardProfile.svelte';

	export let data;
</script>

<QueryClientProvider client={trpc.queryClient}>
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

		<div class="absolute bottom-0 left-0 right-0 top-12 overflow-y-scroll p-12">
			<slot />
		</div>
	</main>
</QueryClientProvider>
