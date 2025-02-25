-- DropForeignKey
ALTER TABLE "Scooter" DROP CONSTRAINT "Scooter_ownerId_fkey";

-- AlterTable
ALTER TABLE "Scooter" ALTER COLUMN "ownerId" DROP NOT NULL,
ALTER COLUMN "ownerId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Scooter" ADD CONSTRAINT "Scooter_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
