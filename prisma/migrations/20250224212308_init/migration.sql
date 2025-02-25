/*
  Warnings:

  - You are about to drop the column `description` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `batteryLevel` on the `Scooter` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batteryCycles` to the `Scooter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastMaintenanceDate` to the `Scooter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mileage` to the `Scooter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Scooter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Maintenance" DROP COLUMN "description",
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "partsReplaced" TEXT[],
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Scooter" DROP COLUMN "batteryLevel",
ADD COLUMN     "batteryCycles" INTEGER NOT NULL,
ADD COLUMN     "lastMaintenanceDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mileage" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "threshold" INTEGER;
