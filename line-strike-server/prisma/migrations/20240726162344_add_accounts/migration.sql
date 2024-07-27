-- CreateTable
CREATE TABLE "Account" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "email" STRING NOT NULL,
    "emailVerified" BOOL NOT NULL,
    "emailVerificationToken" STRING,
    "verificationSentAt" TIMESTAMP(3),
    "passwordHash" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Name" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "accountID" INT8 NOT NULL,

    CONSTRAINT "Name_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_emailVerificationToken_key" ON "Account"("emailVerificationToken");

-- AddForeignKey
ALTER TABLE "Name" ADD CONSTRAINT "Name_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
