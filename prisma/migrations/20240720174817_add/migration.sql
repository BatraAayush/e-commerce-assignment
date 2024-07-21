/*
  Warnings:

  - You are about to drop the column `userId` on the `OTP` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_userId_fkey";

-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "userId",
ADD COLUMN     "createdAt" INTEGER NOT NULL;
