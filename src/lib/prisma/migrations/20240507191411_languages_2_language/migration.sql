/*
  Warnings:

  - The `language` column on the `Transcription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `language` on the `File` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `language` on the `Segment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('CA', 'ES', 'EN', 'FR', 'IT');

-- AlterTable
ALTER TABLE "File" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "Segment" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "Transcription" DROP COLUMN "language",
ADD COLUMN     "language" "Language";

-- DropEnum
DROP TYPE "Languages";
