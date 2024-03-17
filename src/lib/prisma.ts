/**
 * Prisma Recommendation: "Your application should generally only create one instance of PrismaClient": https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
 * Typescript global extend: https://stackoverflow.com/a/68328575 + https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-typeof-globalthis
 */
import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient;
}

if (!global.prisma) global.prisma = new PrismaClient();

export default global.prisma;
