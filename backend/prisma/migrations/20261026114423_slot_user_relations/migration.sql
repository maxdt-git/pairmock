/*
  Warnings:

  - You are about to drop the column `bookerUsername` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `hostUsername` on the `Slot` table. All the data in the column will be lost.
  - Added the required column `hostId` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "bookerUsername",
DROP COLUMN "hostUsername",
ADD COLUMN     "bookerId" TEXT,
ADD COLUMN     "hostId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_bookerId_fkey" FOREIGN KEY ("bookerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
