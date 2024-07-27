/*
  Warnings:

  - A unique constraint covering the columns `[accountID,value]` on the table `Name` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Name_accountID_value_key" ON "Name"("accountID", "value");
