<script lang="ts">
	const sessionId = new URLSearchParams(location.search).get('session_id');

	// const checkSession = () => {
	// 	findCheckoutSession(sessionId!);
	// };
</script>

<div>
	<h1>Payment Success</h1>
	<p>Thank you for your payment. You will receive an email with the details of your purchase.</p>
	<p>Click <a href="/dashboard">here</a> to go to your dashboard.</p>
	<!-- <button on:click={checkSession}>Check</button> -->
</div>
