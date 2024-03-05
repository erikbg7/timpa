<script>
	import { enhance } from '$app/forms';

	export let data;
</script>

<h2>User profile</h2>
{JSON.stringify(data.session)}
<p><a href="/update_email">Change your email</a></p>
<p><a href="/update_password">Change password</a></p>
<p><a href="/delete_user">Delete my account</a></p>
<form action="/signup?/logout" method="POST" use:enhance>
	<button type="submit">Logout</button>
</form>
