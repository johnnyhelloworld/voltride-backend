-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "immobilizedDays" INTEGER,
ADD COLUMN     "warrantyExpiresAt" TIMESTAMP(3);
