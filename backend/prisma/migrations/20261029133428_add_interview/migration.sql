/*
  Warnings:

  - You are about to drop the column `info_thirty` on the `Slot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "info_thirty",
ADD COLUMN     "infoThirty" BOOLEAN NOT NULL DEFAULT false;
