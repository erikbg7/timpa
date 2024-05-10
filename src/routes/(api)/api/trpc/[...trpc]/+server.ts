import { createTRPCSvelteServer } from 'trpc-svelte-query/server';
import { createContext } from '$lib/server/context';

import { appRouter } from '$lib/server/router';

const trpcServer = createTRPCSvelteServer({
	endpoint: '/api/trpc',
	router: appRouter,
	createContext,
});

export const GET = trpcServer.handler;
export const POST = trpcServer.handler;
