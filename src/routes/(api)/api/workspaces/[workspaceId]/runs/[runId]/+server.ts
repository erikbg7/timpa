import prisma from '$lib/prisma';
import { error, json, type RequestEvent } from '@sveltejs/kit';

// get run by id
export async function GET(event: RequestEvent) {
	try {
		const runId = event.params.runId;
		if (!runId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const workspaces = await prisma.run.findUniqueOrThrow({
			where: {
				id: runId,
			},
			select: {
				id: true,
				workspaceId: true,
				screenshots: {
					select: {
						name: true,
						content: true,
					},
				},
			},
		});

		return json(workspaces);
	} catch (e) {
		return error(500, e.message);
	}
}

// delete run by id
export async function DELETE(event: RequestEvent) {
	try {
		const runId = event.params.runId;
		if (!runId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const workspaces = await prisma.run.delete({
			where: {
				id: runId,
			},
		});

		return json(workspaces);
	} catch (error) {
		return {
			status: 500,
			body: {
				error: error.message,
			},
		};
	}
}

// update run by id
export async function PUT(event: RequestEvent) {
	try {
		const runId = event.params.runId;
		if (!runId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const runUpdate = await event.request.json();
		const workspaces = await prisma.run.update({
			where: {
				id: runId,
			},
			data: runUpdate,
		});

		return json(workspaces);
	} catch (error) {
		return {
			status: 500,
			body: {
				error: error.message,
			},
		};
	}
}
