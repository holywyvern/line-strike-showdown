/*
  Warnings:

  - Changed the type of `timestamp` on the `ChatRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ChatRecord" DROP COLUMN "timestamp";
ALTER TABLE "ChatRecord" ADD COLUMN     "timestamp" INT8 NOT NULL;
