import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = await event.locals.getSession();
	// if the user is not logged in redirect back to the home page
	if (!session) {
		throw redirect(303, '/');
	}

	const customer = await event.locals.prisma.customer.findUnique({
		where: {
			email: session.user.email!,
		},
	});

	return {
		props: {
			plan: customer?.plan,
			isCustomer: !!customer,
		},
	};
}
