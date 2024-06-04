import { router } from '$lib/server/trpc';
import { createFilesService } from './services/files';
import { createCustomerService } from './services/customer';

export const appRouter = router({
	files: createFilesService(),
	customer: createCustomerService(),
});

export type AppRouter = typeof appRouter;
