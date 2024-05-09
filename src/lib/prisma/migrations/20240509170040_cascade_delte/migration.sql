/*
  Warnings:

  - Made the column `language` on table `Transcription` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FileTranscriptionStatus" AS ENUM ('IN_PROGESS', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Segment" DROP CONSTRAINT "Segment_transcriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Transcription" DROP CONSTRAINT "Transcription_fileId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "status" "FileTranscriptionStatus" NOT NULL DEFAULT 'IN_PROGESS',
ALTER COLUMN "language" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transcription" ALTER COLUMN "language" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcription" ADD CONSTRAINT "Transcription_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_transcriptionId_fkey" FOREIGN KEY ("transcriptionId") REFERENCES "Transcription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
