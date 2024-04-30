import prisma from '$lib/prisma';
import { error, json, type RequestEvent } from '@sveltejs/kit';

// get all runs
export async function GET(event: RequestEvent) {
	try {
		const workspaceId = event.params.workspaceId;
		if (!workspaceId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const runs = await prisma.workspace.findUniqueOrThrow({
			where: {
				id: workspaceId,
			},
			select: {
				runs: {
					select: {
						id: true,
						workspaceId: true,
						screenshots: {
							select: { name: true },
						},
					},
				},
			},
		});

		return json(runs.runs);
	} catch (e) {
		return error(500, e.message);
	}
}

// delete all runs
export async function DELETE(event: RequestEvent) {
	try {
		const workspaceId = event.params.workspaceId;
		if (!workspaceId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const runs = await prisma.run.deleteMany({
			where: {
				workspace: {
					id: workspaceId,
				},
			},
		});

		return json(runs);
	} catch (e) {
		return error(500, e.message);
	}
}

// create a new run
export async function POST(event: RequestEvent) {
	try {
		const workspaceId = event.params.workspaceId;
		if (!workspaceId) throw new Error('Workspace ID is required');

		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const { screenshotBase64, screenshotName } = await event.request.json();

		console.log({ screenshotBase64, screenshotName });

		const runs = await prisma.run.create({
			data: {
				screenshots: {
					createMany: {
						data: [
							{
								name: screenshotName,
								content: screenshotBase64,
							},
						],
					},
				},
				workspace: {
					connect: {
						id: workspaceId,
					},
				},
			},
		});

		return json(runs);
	} catch (e) {
		return error(500, e.message);
	}
}
