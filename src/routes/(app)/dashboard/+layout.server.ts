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
		select: {
			plan: true,
			workspaces: {
				select: {
					id: true,
					name: true,
					flowSessions: {
						select: {
							id: true,
							createdAt: true,
							workspaceId: true,
							events: {
								select: {
									id: true,
									eventType: true,
									createdAt: true,
								},
							},
						},
					},
				},
			},
		},
	});

	return {
		props: {
			session: session,
			isCustomer: !!customer,
		},
		customer: customer,
		workspaces: customer?.workspaces || [],
	};
}
