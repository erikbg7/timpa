import { redirect } from '@sveltejs/kit';

export async function load({ locals: { auth, supabase } }) {
	const session = await auth.queries.getSession();
	// if the user is not logged in redirect back to the home page
	if (!session) {
		throw redirect(303, '/');
	}

	const customer = await supabase
		.from('customers')
		.select()
		.eq('email', session.user.email!)
		.single();

	return {
		props: {
			session: session,
			isCustomer: !!customer.data,
		},
	};
}
