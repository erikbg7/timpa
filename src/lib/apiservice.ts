import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';
import type { RequestEvent } from '@sveltejs/kit';

export class WorkspaceApiService {
	fetch: RequestEvent['fetch'];

	constructor(fetch: RequestEvent['fetch']) {
		this.fetch = fetch;
	}

	async getWorkspaces() {
		const data = await this.fetch(`${BASE_URL}/api/workspaces`, { method: 'GET' });
		const res = await data.json();
		return res;
	}
}

type EndpointHelperParams = { fetch: RequestEvent['fetch']; params: RequestEvent['params'] };

type GetWorkspacesParams = {} & SvelteKitFetch;
export async function getWorkspaces({ fetch }: EndpointHelperParams) {
	const data = await fetch(`${BASE_URL}/api/workspaces`, { method: 'GET' });
	const res = await data.json();
	return res;
}

type CreateWorkspacesParams = { name: string };
export async function createWorkspace({ fetch, params }: EndpointHelperParams) {
	const data = await fetch(`${BASE_URL}/api/workspaces`, {
		method: 'POST',
		body: JSON.stringify(params),
	});
	const res = await data.json();
	return res;
}

type GetWorkspaceByIdParams = { workspaceId: string } & SvelteKitFetch;
export async function getWorkspaceById({ params, fetch }: EndpointHelperParams) {
	const data = await fetch(`${BASE_URL}/api/workspaces/${params.workspaceId}`, { method: 'GET' });
	const res = await data.json();
	return res;
}

type DeleteWorkspaceByIdParams = { workspaceId: string };
export async function deleteWorkspaceById(params: DeleteWorkspaceByIdParams) {
	const data = await fetch(`${BASE_URL}/api/workspaces/${params.workspaceId}`, {
		method: 'DELETE',
	});
	const res = await data.json();
	return res;
}

type GetWorkspaceRunsParams = { workspaceId: string };
export async function getWorkspaceRuns(params: GetWorkspaceRunsParams) {
	const data = await fetch(`${BASE_URL}/api/workspaces/${params.workspaceId}/runs`, {
		method: 'GET',
	});
	const res = await data.json();
	return res;
}

type DeleteWorkspaceRunsParams = { workspaceId: string };
export async function deleteWorkspaceRuns(params: DeleteWorkspaceRunsParams) {
	const data = await fetch(`${BASE_URL}/api/workspaces/${params.workspaceId}/runs`, {
		method: 'DELETE',
	});
	const res = await data.json();
	return res;
}

type GetWorkspaceRunByIdParams = { workspaceId: string; runId: string };
export async function getWorkspaceRunById(params: GetWorkspaceRunByIdParams) {
	const data = await fetch(
		`${BASE_URL}/api/workspaces/${params.workspaceId}/runs/${params.runId}`,
		{
			method: 'GET',
		},
	);
	const res = await data.json();
	return res;
}

type UpdateWorkspaceRunByIdParams = { workspaceId: string; runId: string };
export async function updateWorkspaceRunById(params: UpdateWorkspaceRunByIdParams) {
	const data = await fetch(
		`${BASE_URL}/api/workspaces/${params.workspaceId}/runs/${params.runId}`,
		{
			method: 'PUT',
			body: JSON.stringify(params),
		},
	);
	const res = await data.json();
	return res;
}

type DeleteWorkspaceRunByIdParams = { workspaceId: string; runId: string };
export async function deleteWorkspaceRunById(params: DeleteWorkspaceRunByIdParams) {
	const data = await fetch(
		`${BASE_URL}/api/workspaces/${params.workspaceId}/runs/${params.runId}`,
		{ method: 'DELETE' },
	);
	const res = await data.json();
	return res;
}
