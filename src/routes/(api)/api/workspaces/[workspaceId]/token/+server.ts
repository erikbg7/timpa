import prisma from '$lib/prisma';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
	try {
		const workspaceId = event.params.workspaceId;
		if (!workspaceId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const workspaces = await prisma.workspace.update({
			data: {
				// Should generate a new token and add/replace it in the workspace
				name: 'name',
			},
			where: {
				id: workspaceId,
			},
		});

		return json({ workspaces });
	} catch (error) {
		return {
			status: 500,
			body: {
				error: error.message,
			},
		};
	}
}
