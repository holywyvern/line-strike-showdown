-- AlterTable
ALTER TABLE "MatchRecordPlayer" ADD COLUMN     "playmat" STRING NOT NULL DEFAULT 'blue_basic.webp';
ALTER TABLE "MatchRecordPlayer" ADD COLUMN     "playmatOpacity" INT4 NOT NULL DEFAULT 0;
ALTER TABLE "MatchRecordPlayer" ADD COLUMN     "sleeve" STRING NOT NULL DEFAULT 'blue_basic.webp';
