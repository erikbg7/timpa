-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'STANDARD', 'PRO');

-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('CA', 'ES', 'EN', 'FR', 'IT');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "language" "Languages" NOT NULL,
    "customerId" INTEGER,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language" "Languages" NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "Transcription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segment" (
    "segmentId" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "start" DOUBLE PRECISION NOT NULL,
    "end" DOUBLE PRECISION NOT NULL,
    "text" TEXT NOT NULL,
    "language" "Languages" NOT NULL,
    "transcriptionId" TEXT NOT NULL,

    CONSTRAINT "Segment_pkey" PRIMARY KEY ("segmentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "File_name_key" ON "File"("name");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcription" ADD CONSTRAINT "Transcription_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_transcriptionId_fkey" FOREIGN KEY ("transcriptionId") REFERENCES "Transcription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
