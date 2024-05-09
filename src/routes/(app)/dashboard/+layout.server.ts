import { redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function load(event) {
	event.depends('dashboard-files');

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
			files: true,
			// workspaces: {
			// 	select: {
			// 		id: true,
			// 		name: true,
			// 		referenceScreenshots: {
			// 			select: {
			// 				id: true,
			// 				workspaceId: true,
			// 				name: true,
			// 				content: true,
			// 			},
			// 		},
			// 	},
			// },
		},
	});

	if (!customer) {
		return {};
	}

	const signedFiles = await Promise.all(
		customer.files.map(async (file) => {
			const filePath = `${session.user.id}/${file.url.split('/').pop()}`;
			const data = await event.locals.supabase.storage.from('files').createSignedUrl(filePath, 10);
			return {
				...file,
				url: data.data?.signedUrl,
			};
		}),
	);

	return {
		props: {
			session: session,
			isCustomer: !!customer,
		},
		customer: customer,
		files: signedFiles || [],
		// workspaces: customer?.workspaces || [],
		// workspaces: [],
	};
}
