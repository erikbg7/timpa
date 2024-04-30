import prisma from '$lib/prisma';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	try {
		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const workspaces = await prisma.workspace.findMany({
			where: {
				Customer: {
					email: session.user.email,
				},
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

export async function POST(event: RequestEvent) {
	try {
		const session = await event.locals.getSession();
		if (!session) throw new Error('Unauthorized');

		const { name } = await event.request.json();
		const workspaces = await prisma.workspace.create({
			data: {
				name: name,
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
