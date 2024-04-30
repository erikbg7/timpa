import type { Run, Workspace } from '@prisma/client';
import type { PageServerLoad } from './$types.js';

type Props = {
	workspace: Workspace;
	runs: Run[];
};

export const load: PageServerLoad<Props> = async (event) => {
	const workspaceId = event.params.workspaceId;

	const workspaceData = await event.fetch(`/api/workspaces/${workspaceId}`, { method: 'GET' });
	const runsData = await event.fetch(`/api/workspaces/${workspaceId}/runs`, { method: 'GET' });

	return {
		workspace: await workspaceData.json(),
		runs: await runsData.json(),
	};
};
