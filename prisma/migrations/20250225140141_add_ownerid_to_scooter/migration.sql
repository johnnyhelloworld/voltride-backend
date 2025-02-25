-- AlterTable
ALTER TABLE "Scooter" ADD COLUMN     "ownerId" TEXT NOT NULL DEFAULT '1';

-- AddForeignKey
ALTER TABLE "Scooter" ADD CONSTRAINT "Scooter_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
