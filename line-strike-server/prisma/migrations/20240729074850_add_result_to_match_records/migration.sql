-- CreateEnum
CREATE TYPE "MatchRecordResult" AS ENUM ('VICTORY_A', 'VICTORY_B', 'DRAW');

-- AlterTable
ALTER TABLE "MatchRecord" ADD COLUMN     "result" "MatchRecordResult" NOT NULL DEFAULT 'DRAW';
