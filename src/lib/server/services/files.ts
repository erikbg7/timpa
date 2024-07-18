import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';
import logger from '$lib/logger';
import { AssemblyAI } from 'assemblyai';
import { ASSEMBLY_API_KEY } from '$env/static/private';

const db = new Map<string, string>();

const getFileSchema = z.object({
	id: z.string(),
});

export const createFilesService = () =>
	router({
		getUrl: protectedProcedure.input(getFileSchema).query(async ({ ctx, input }) => {
			const prisma = ctx.event.locals.prisma;
			const file = await prisma.file.findUnique({
				where: { id: input.id },
				select: { url: true },
			});

			if (!file) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'File not found',
				});
			}

			const EXPIRES_IN = 10 * 60; // 10 minutes

			const data = await ctx.event.locals.supabase.storage
				.from('files')
				.createSignedUrl(file.url.split('files/').pop()!, EXPIRES_IN);

			return { ...file, url: data.data?.signedUrl };
		}),
		list: protectedProcedure.query(async ({ ctx }) => {
			try {
				console.log({ ctx: ctx.session.user.id });
				const files = await ctx.event.locals.prisma.file.findMany({
					where: {
						customerId: ctx.session.user.id,
					},
				});

				// const files = await ctx.event.locals.prisma.file.findMany({
				// 	where: {
				// 		customerId: ctx.session.user.id,
				// 	},
				// });

				// const signedFiles = await Promise.all(
				// 	files.map(async (file) => {
				// 		const filePath = `${ctx.session.user.id}/${file.url.split('/').pop()}`;
				// 		const data = await ctx.event.locals.supabase.storage
				// 			.from('files')
				// 			.createSignedUrl(filePath, 10);
				// 		return {
				// 			...file,
				// 			url: data.data?.signedUrl,
				// 		};
				// 	}),
				// );

				return files;
			} catch (e) {
				console.log({ ERROR: e });
			}
		}),
		delete: protectedProcedure
			.input(
				z.object({
					id: z.string(),
				}),
			)
			.mutation(async ({ input, ctx }) => {
				const { error } = await ctx.event.locals.supabase.storage
					.from('files')
					.remove([`${ctx.session.user.id}/${input.id}`]);

				if (error) {
					logger.error('Could not delete file from storage', { error });
				}

				await ctx.event.locals.prisma.file.delete({
					where: {
						id: input.id,
					},
				});
			}),
		add: protectedProcedure
			.input(
				z.object({
					// file: z.custom<File>(),
					name: z.string().optional(),
				}),
			)
			.mutation(async ({ input, ctx }) => {
				console.log({ ffffff: input });
				// console.log({ ffffff: input.file });
				// const fileName = input.name || input.file.name;
				// const fileExtension = input.file.name.split('.').pop() as string;
				// const fileId = Date.now().toString().concat(`.${fileExtension}`);
				// const { data, error } = await ctx.event.locals.supabase.storage
				// 	.from('files')
				// 	.upload(`${ctx.session.user.id}/${fileId}`, input.file, {
				// 		cacheControl: '3600',
				// 		upsert: false,
				// 	});

				// if (error) {
				// 	throw new TRPCError({
				// 		code: 'INTERNAL_SERVER_ERROR',
				// 		message: 'Error uploading file',
				// 	});
				// }

				return { n: 'nice' };
				// db.set(crypto.randomUUID(), input.data);
			}),
		get: protectedProcedure
			.input(
				z.object({
					id: z.string(),
				}),
			)
			.query(async ({ input, ctx }) => {
				try {
					const file = await ctx.event.locals.prisma.file.findUniqueOrThrow({
						where: {
							id: input.id,
						},
						include: {
							prediction: {
								include: {
									segments: true,
								},
							},
						},
					});

					console.log({ file });

					return file;
				} catch (e) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: 'Todo not found',
					});
				}
			}),

		update: publicProcedure
			.input(
				z.object({
					id: z.string(),
					data: z.string(),
				}),
			)
			.mutation(({ input }) => {
				if (!db.has(input.id)) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: 'Todo not found',
					});
				}
				db.set(input.id, input.data);
				return input;
			}),
	});
