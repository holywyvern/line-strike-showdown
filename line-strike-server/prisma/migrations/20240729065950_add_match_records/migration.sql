-- CreateTable
CREATE TABLE "MatchRecord" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "playerAID" INT8 NOT NULL,
    "playerBID" INT8 NOT NULL,
    "accountAID" INT8,
    "accountBID" INT8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchRecordPlayer" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "sessionID" STRING NOT NULL,
    "startingHandIDs" INT4[],
    "startingDeckIDs" INT4[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchRecordPlayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchRecord" ADD CONSTRAINT "MatchRecord_accountAID_fkey" FOREIGN KEY ("accountAID") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRecord" ADD CONSTRAINT "MatchRecord_accountBID_fkey" FOREIGN KEY ("accountBID") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRecord" ADD CONSTRAINT "MatchRecord_playerAID_fkey" FOREIGN KEY ("playerAID") REFERENCES "MatchRecordPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRecord" ADD CONSTRAINT "MatchRecord_playerBID_fkey" FOREIGN KEY ("playerBID") REFERENCES "MatchRecordPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
