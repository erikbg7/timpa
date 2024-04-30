import type { Run } from '@prisma/client';
import type { PageServerLoad } from './$types';

type Output = {
	runId: string;
	screenshots: {
		name: string;
		diff: number[];
		reference: string;
		current: string;
	}[];
};

export const load: PageServerLoad<Output> = async (event) => {
	const { workspaceId, runId } = event.params;

	const prisma = event.locals.prisma;

	const screenshots = await prisma.screenshot.findMany({
		where: { runId: runId },
	});

	const referenceScreenshots = await prisma.referenceScreenshot.findMany({
		where: { workspaceId: workspaceId },
	});

	const comparisons = screenshots.map((s) => {
		const reference = referenceScreenshots.find((rs) => rs.name === s.name);

		return {
			name: s.name,
			diff: s.diff,
			reference: reference?.content || '',
			current: s.content,
		};
	});

	// const runData = await event.fetch(`/api/workspaces/${workspaceId}/runs/${runId}`, {
	// 	method: 'GET',
	// });

	// console.log({ referenceScreenshots });

	return {
		runId,
		screenshots: comparisons,
	};
};
