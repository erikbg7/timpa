import { router } from '$lib/server/trpc';
import { createFilesService } from '$lib/server/services/files';

export const appRouter = router({
	files: createFilesService(),
});

export type AppRouter = typeof appRouter;
