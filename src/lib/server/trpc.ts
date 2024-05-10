import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import { transformer } from '$lib/trpc/transformer';

const t = initTRPC.context<Context>().create({
	transformer,
});

const isAuthed = t.middleware(async ({ ctx, next }) => {
	const session = await ctx.event.locals.getSession();
	if (!session?.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Unauthorized',
		});
	}
	return next({ ctx: { ...ctx, session } });
});

//   const isCostumer = t.middleware(async ({ ctx, next }) => {
// 	if (!ctx?.session?.user?.isCustomer) {
// 	  throw new TRPCError({
// 		code: 'UNAUTHORIZED',
// 		message: 'You must be a customer to access this resource',
// 	  });
// 	}

// 	return next({ ctx: { ...ctx, session: ctx.session } });
//   });

export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
