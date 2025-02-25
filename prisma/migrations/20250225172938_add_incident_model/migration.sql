-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "scooterId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "underWarranty" BOOLEAN NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);
