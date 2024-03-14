<script lang="ts">
	import { enhance } from '$app/forms';
	import H1 from '$lib/atoms/H1.svelte';
	import Pricing from '$lib/components/Pricing.svelte';

	export let data;
</script>

<h2>User dashboard</h2>

<div class="relative flex justify-end">
	<!-- <div class=" dropdown dropdown-end">
		<div tabIndex={0} role="button" class="avatar btn btn-circle btn-ghost">
			<div class="w-10 rounded-full border-2 border-green-400">
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
	</div> -->
</div>

<!-- {JSON.stringify(data.session)} -->

<!-- <details open>
	<summary>Parent item</summary>
	<ul>
		<li><a>Submenu 1</a></li>
		<li><a>Submenu 2</a></li>
		<li>
			<details open>
				<summary>Parent</summary>
				<ul>
					<li><a>item 1</a></li>
					<li><a>item 2</a></li>
				</ul>
			</details>
		</li>
	</ul>
</details>
<div class="avatar hover:cursor-pointer">
	<div class="w-8 rounded-full border-2 border-green-400">
		<img src={data.session?.user.user_metadata.avatar_url} />
	</div>
</div> -->
<!-- <p><a href="/update_email">Change your email</a></p>
<p><a href="/update_password">Change password</a></p>
<p><a href="/delete_user">Delete my account</a></p> -->

{#if data?.props?.isCustomer}
	<H1>CONGRATS! YOU ARE A CUSTOMER {data.session?.user?.email}</H1>
{:else}
	<Pricing />
{/if}
