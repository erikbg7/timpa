-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'STANDARD', 'PRO');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'FREE';
