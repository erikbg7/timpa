/**
 * Prisma Recommendation: "Your application should generally only create one instance of PrismaClient": https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
 * Typescript global extend: https://stackoverflow.com/a/68328575 + https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-typeof-globalthis
 */

import type { PrismaClient } from '@prisma/client';
import Prisma from '@prisma/client';

let prisma: PrismaClient;

if (Prisma === undefined) {
	import('@prisma/client').then(({ PrismaClient }) => {
		prisma = new PrismaClient();
	});
} else {
	prisma = new Prisma.PrismaClient();
}

export default prisma;

// import { PrismaClient } from '@prisma/client';

// declare global {
// 	var prisma: PrismaClient;
// }

// if (!global.prisma) {
// 	global.prisma = new PrismaClient();
// }

// export default global.prisma;
