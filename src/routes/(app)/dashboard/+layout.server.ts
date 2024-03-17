import { redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function load(event) {
	const session = await event.locals.getSession();
	// if the user is not logged in redirect back to the home page
	if (!session) {
		throw redirect(303, '/');
	}

	const customer = await prisma.customer.findUnique({
		where: {
			email: session.user.email!,
		},
	});

	console.log('customer', customer);

	return {
		props: {
			session: session,
			isCustomer: !!customer,
		},
	};
}
