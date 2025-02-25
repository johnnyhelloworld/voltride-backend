-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ALTER COLUMN "underWarranty" SET DEFAULT false;
