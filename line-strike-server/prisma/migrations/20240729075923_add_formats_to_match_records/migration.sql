-- AlterTable
ALTER TABLE "MatchRecord" ADD COLUMN     "formatID" INT4 NOT NULL DEFAULT 1;
ALTER TABLE "MatchRecord" ADD COLUMN     "type" "MatchType" NOT NULL DEFAULT 'UNRANKED';
