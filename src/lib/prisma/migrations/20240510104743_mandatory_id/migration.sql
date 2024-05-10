/*
  Warnings:

  - Made the column `customerId` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "customerId" SET NOT NULL;
