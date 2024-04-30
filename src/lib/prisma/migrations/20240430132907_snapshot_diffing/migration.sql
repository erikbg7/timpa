-- AlterTable
ALTER TABLE "Screenshot" ADD COLUMN     "diff" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
