-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('UNRANKED', 'RANKED');

-- CreateTable
CREATE TABLE "MatchCount" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "formatID" INT4 NOT NULL,
    "wins" INT8 NOT NULL DEFAULT 0,
    "total" INT8 NOT NULL DEFAULT 0,
    "type" "MatchType" NOT NULL,
    "accountID" INT8 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountELO" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "formatID" INT4 NOT NULL,
    "value" INT4 NOT NULL DEFAULT 1500,
    "accountID" INT8 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountELO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchCount_formatID_accountID_key" ON "MatchCount"("formatID", "accountID");

-- CreateIndex
CREATE UNIQUE INDEX "AccountELO_accountID_formatID_key" ON "AccountELO"("accountID", "formatID");

-- AddForeignKey
ALTER TABLE "MatchCount" ADD CONSTRAINT "MatchCount_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountELO" ADD CONSTRAINT "AccountELO_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
