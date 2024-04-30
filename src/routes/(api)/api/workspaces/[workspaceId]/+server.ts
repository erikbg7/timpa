import prisma from '$lib/prisma';
import { json, error, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	try {
		const workspaceId = event.params.workspaceId;
		if (!workspaceId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const workspace = await prisma.workspace.findUniqueOrThrow({
			where: {
				id: workspaceId,
				Customer: {
					email: session.user.email,
				},
			},
		});

		return json(workspace);
	} catch (e) {
		return error(500, e.message);
	}
}

// Should remove workspace and all related data (runs) cascade
export async function DELETE(event: RequestEvent) {
	try {
		const workspaceId = event.params.workspaceId;
		if (!workspaceId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const workspaces = await prisma.workspace.delete({
			where: {
				id: workspaceId,
			},
		});

		return json(workspaces);
	} catch (e) {
		return error(500, e.message);
	}
}
