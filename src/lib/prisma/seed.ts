import { PrismaClient } from '@prisma/client'
import { Plan } from '$lib/enums';
import { PredictionStatus } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
	await prisma.customer.upsert({
		where: { email: 'erik.bg7@gmail.com' },
		update: {},
		create: {
			id: '47cb63e0-6bc8-4683-ab56-b897be878f24',
			email: 'erik.bg7@gmail.com',
			plan: Plan.STANDARD,
			files: {
				createMany: {
					data: [
						{
							name: 'file1',
							url: '1716580149768.mp3',
							size: 100,
                            duration: 100,
                            extension: 'mp3',
                            status: PredictionStatus.IN_PROGRESS
						},
						{
							name: 'file2',
							url: '1716580149768.mp3',
							size: 200,
                            duration: 200,
                            extension: 'mp3',
                            status: PredictionStatus.COMPLETED
						},
						{
							name: 'file3',
							url: '1716580149768.mp3',
							size: 300,
                            duration: 300,
                            extension: 'mp3',
                            status: PredictionStatus.FAILED
						},
					],
				},
			},
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
