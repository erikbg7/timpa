import { redirect } from '@sveltejs/kit';

// export async function load(event) {
// 	const session = await event.locals.getSession();
// 	// if the user is not logged in redirect back to the home page
// 	if (!session) {
// 		redirect(303, '/');
// 	}

// 	const customer = await event.locals.prisma.customer.findUnique({
// 		where: {
// 			email: session.user.email!,
// 		},
// 	});

// 	if (!customer) {
// 		return {
// 			session: session,
// 			isCustomer: false,
// 		};
// 	}

// 	const workspaces = await event.locals.prisma.workspace.findMany({
// 		where: {
// 			customerId: customer!.id,
// 		},
// 		include: {
// 			flowSessions: true,
// 		},
// 	});

// 	return {
// 		props: {
// 			session: session,
// 			isCustomer: !!customer,
// 			workspaces: workspaces || [],
// 		},
// 	};
// }

// export const actions = {
// 	createWorkspace: async (event) => {
// 		const formData = await event.request.formData();
// 		const name = formData.get('name') as string;
// 		const description = formData.get('description') as string;

// 		const session = await event.locals.getSession();
// 		const customer = await event.locals.prisma.customer.findUnique({
// 			where: {
// 				email: session!.user.email!,
// 			},
// 		});

// 		try {
// 			const workspace = await event.locals.prisma.workspace.create({
// 				data: {
// 					name,
// 					customerId: customer!.id,
// 				},
// 			});

// 			console.log({ workspace });

// 			return { success: true };
// 		} catch (error) {
// 			console.log({ error });
// 		}
// 	},
// 	deleteWorkspace: async (event) => {
// 		const formData = await event.request.formData();
// 		const workspaceId = formData.get('workspaceId') as string;

// 		console.log({ workspaceId });

// 		const session = await event.locals.getSession();
// 		const customer = await event.locals.prisma.customer.findUnique({
// 			where: {
// 				email: session!.user.email!,
// 			},
// 		});

// 		try {
// 			const workspace = await event.locals.prisma.workspace.delete({
// 				where: {
// 					id: workspaceId,
// 					customerId: customer!.id,
// 				},
// 			});

// 			console.log({ workspace });
// 		} catch (error) {
// 			console.log({ error });
// 		}
// 	},
// };
