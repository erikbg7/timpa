<script lang="ts">
	import { enhance } from '$app/forms';
	import H1 from '$lib/atoms/H1.svelte';
	import Pricing from '$lib/components/Pricing.svelte';

	export let data;
</script>

<h2>User dashboard</h2>
{JSON.stringify(data.session)}
<p><a href="/update_email">Change your email</a></p>
<p><a href="/update_password">Change password</a></p>
<p><a href="/delete_user">Delete my account</a></p>
<form action="/signin?/logout" method="POST" use:enhance>
	<button type="submit">Logout</button>
</form>

{#if data?.props?.isCustomer}
	<H1>CONGRATS! YOU ARE A CUSTOMER {data.session?.user?.email}</H1>
{:else}
	<Pricing />
{/if}
