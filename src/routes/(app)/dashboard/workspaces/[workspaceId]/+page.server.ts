import { EventType } from '$lib/enums';

export async function load(event) {
	event.depends('flowSession:events');

	const workspaceId = event.params.workspaceId;

	const workspace = await event.locals.prisma.workspace.findFirst({
		where: {
			id: Number(workspaceId),
		},
		include: {
			flowSessions: {
				include: {
					events: true,
				},
			},
		},
	});

	if (!workspace) {
		return {
			status: 404,
			redirect: '/404',
		};
	}

	const currentFlowSession = workspace.flowSessions.find(
		(session) => session.id === workspace.activeFlowSessionId,
	);

	return {
		props: {
			flowSessions: workspace.flowSessions,
			activeFlowSessionId: currentFlowSession?.id,
			events: currentFlowSession?.events.sort(
				(a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
			),
		},
	};
}
export const actions = {
	createFlow: async (event) => {
		const formData = await event.request.formData();
		const eventType = formData.get('eventType') as EventType;
		const params = event.params as { workspaceId: string };
		const workspaceId = params.workspaceId;

		Array.from(formData.keys()).forEach((key) => {
			console.log({ key });
		});

		console.log({ formData: formData.keys(), eventType, workspaceId });

		if (eventType !== EventType.CREATE) return;

		const flowSession = await event.locals.prisma.flowSession.create({
			data: {
				workspaceId: Number(workspaceId),
				events: {
					createMany: {
						data: [{ eventType: EventType.CREATE }, { eventType: EventType.ACTIVE }],
					},
				},
			},
			include: {
				events: true,
			},
		});

		await event.locals.prisma.workspace.update({
			where: {
				id: Number(workspaceId),
			},
			data: {
				activeFlowSessionId: flowSession.id,
			},
		});
	},
	updateFlow: async (event) => {
		const params = event.params as { workspaceId: string };
		const workspaceId = params.workspaceId;

		const formData = await event.request.formData();
		const flowSessionEvent = formData.get('flowSessionEvent') as string;

		const [eventType, _flowSessionId] = flowSessionEvent.split(',');
		const flowSessionId = Number(_flowSessionId);

		if (!eventType) {
			return { error: 'Event type missing' };
		}

		if (!flowSessionId) {
			return { error: 'There is no active session in this workspace' };
		}

		if (eventType === EventType.END) {
			await event.locals.prisma.workspace.update({
				where: {
					id: Number(workspaceId),
				},
				data: {
					activeFlowSessionId: null,
				},
			});
		}

		switch (eventType) {
			case EventType.ACTIVE:
			case EventType.BREAK:
			case EventType.INTERRUPTION:
			case EventType.END:
				await event.locals.prisma.event.create({
					data: {
						eventType,
						flowSessionId,
					},
				});

				return { success: true };
			default:
				break;
		}
	},
};
