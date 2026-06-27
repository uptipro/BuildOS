-- Add construction-module-specific columns to "Project" so the richer
-- construction project shape (site address, project manager, cluster, RAG
-- status, contractor, contract type, sector/category, setup flags, …) is
-- stored with full fidelity. All columns are nullable so existing rows and the
-- core ERP project shape remain valid.
ALTER TABLE "Project"
ADD COLUMN "siteAddress" TEXT,
ADD COLUMN "mainContractor" TEXT,
ADD COLUMN "mainContractorId" TEXT,
ADD COLUMN "contractType" TEXT,
ADD COLUMN "clusterId" TEXT,
ADD COLUMN "ragStatus" TEXT DEFAULT 'on-track',
ADD COLUMN "description" TEXT,
ADD COLUMN "descriptor" TEXT,
ADD COLUMN "sector" TEXT,
ADD COLUMN "category" TEXT,
ADD COLUMN "blockCount" INTEGER,
ADD COLUMN "contractingModel" TEXT,
ADD COLUMN "lastReportDate" TIMESTAMP(3),
ADD COLUMN "setupComplete" BOOLEAN DEFAULT false,
ADD COLUMN "setupProgress" INTEGER DEFAULT 0,
ADD COLUMN "setupLocked" BOOLEAN DEFAULT false;
