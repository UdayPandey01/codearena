/*
  Warnings:

  - You are about to drop the column `LanguageId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `examples` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Problem" ADD COLUMN     "constraints" TEXT,
ADD COLUMN     "examples" JSONB NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Submission" DROP COLUMN "LanguageId",
ADD COLUMN     "languageId" INTEGER NOT NULL;
