import { protectedProcedure, router } from '../trpc';

export const createCustomerService = () =>
	router({
		get: protectedProcedure.query(async ({ ctx }) => {
			try {
				const customer = await ctx.event.locals.prisma.customer.findUnique({
					where: {
						id: ctx.session.user.id
					}
				});

				// if (!customer) {
				// 	throw new Error('Customer not found');
				// }

				return customer;
			} catch (e) {
				console.log({ ERROR: e });
			}
		})
	});
