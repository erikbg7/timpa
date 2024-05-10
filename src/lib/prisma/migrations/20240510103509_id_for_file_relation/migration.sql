/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_customerEmail_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "customerEmail",
ADD COLUMN     "customerId" TEXT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
