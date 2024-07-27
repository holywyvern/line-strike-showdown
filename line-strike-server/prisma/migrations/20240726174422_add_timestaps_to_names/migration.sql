/*
  Warnings:

  - Added the required column `updatedAt` to the `Name` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Name` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Name" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Name" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
ALTER TABLE "Name" ADD COLUMN     "value" STRING NOT NULL;
