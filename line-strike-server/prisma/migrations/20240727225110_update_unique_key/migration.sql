/*
  Warnings:

  - A unique constraint covering the columns `[formatID,accountID,type]` on the table `MatchCount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MatchCount_formatID_accountID_key";

-- CreateIndex
CREATE UNIQUE INDEX "MatchCount_formatID_accountID_type_key" ON "MatchCount"("formatID", "accountID", "type");
