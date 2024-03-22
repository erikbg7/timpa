<script lang="ts">
	import { enhance } from '$app/forms';

	export let avatarUrl: string;
	export let fullName: string;
</script>

<div class="dropdown dropdown-end">
	<div tabIndex={0} role="button" class="avatar btn btn-circle btn-ghost">
		<div class="w-6 rounded-full border-2 border-white">
			<img src={avatarUrl} />
		</div>
	</div>
	<ul
		tabIndex={0}
		class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box border border-white/10 bg-neutral-900 p-2 shadow"
	>
		<li>
			<div class="flex flex-col items-start">
				<span class="text-sm">Signed in as</span>
				<span class="font-semibold">{fullName}</span>
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
