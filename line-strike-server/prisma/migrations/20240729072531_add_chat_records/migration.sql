-- CreateTable
CREATE TABLE "ChatRecord" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "timestamp" INT4 NOT NULL,
    "matchRecordID" INT8 NOT NULL,
    "type" STRING NOT NULL,
    "playerID" STRING,
    "name" STRING,
    "message" STRING,
    "turn" INT4,
    "position" INT4,
    "newPosition" INT4,
    "cardID" INT4,
    "blocks" INT4,
    "damage" INT4,
    "busters" INT4,
    "lane" INT4,
    "handIndex" INT4,
    "oldValue" INT4,
    "newValue" INT4,

    CONSTRAINT "ChatRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatRecord" ADD CONSTRAINT "ChatRecord_matchRecordID_fkey" FOREIGN KEY ("matchRecordID") REFERENCES "MatchRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
