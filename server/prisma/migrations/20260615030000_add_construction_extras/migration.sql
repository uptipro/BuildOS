-- CreateTable
CREATE TABLE "EarnedValueRecord" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "plannedValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "earnedValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "actualCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EarnedValueRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConstructionBaseline" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "label" TEXT NOT NULL DEFAULT '',
    "lockedAt" TEXT NOT NULL DEFAULT '',
    "lockedBy" TEXT NOT NULL DEFAULT '',
    "taskSnapshots" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConstructionBaseline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConstructionCalendar" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "workingDays" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "workingHoursStart" TEXT NOT NULL DEFAULT '08:00',
    "workingHoursEnd" TEXT NOT NULL DEFAULT '17:00',
    "holidays" JSONB NOT NULL DEFAULT '[]',
    "shutdowns" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConstructionCalendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConstructionSetting" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'global',
    "scheduleLevels" JSONB NOT NULL DEFAULT '[]',
    "weatherConfig" JSONB NOT NULL DEFAULT '[]',
    "projectTypes" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConstructionSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConstructionTask" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "parentTaskId" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "wbsLevelId" TEXT,
    "name" TEXT NOT NULL,
    "plannedStart" TEXT NOT NULL DEFAULT '',
    "plannedEnd" TEXT NOT NULL DEFAULT '',
    "actualStart" TEXT,
    "actualEnd" TEXT,
    "plannedDuration" INTEGER NOT NULL DEFAULT 0,
    "actualDuration" INTEGER,
    "percentComplete" INTEGER NOT NULL DEFAULT 0,
    "predecessorId" TEXT,
    "dependencyType" TEXT,
    "lagDays" INTEGER NOT NULL DEFAULT 0,
    "vendorId" TEXT,
    "subVendorIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "structureEntryId" TEXT,
    "ragStatus" TEXT NOT NULL DEFAULT 'on-track',
    "ragOverride" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT NOT NULL DEFAULT '',
    "isMilestone" BOOLEAN NOT NULL DEFAULT false,
    "wbsNumber" TEXT,
    "totalFloat" INTEGER,
    "freeFloat" INTEGER,
    "isCritical" BOOLEAN NOT NULL DEFAULT false,
    "baselinePlannedStart" TEXT,
    "baselinePlannedEnd" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConstructionTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HumanResource" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'vendor',
    "name" TEXT NOT NULL,
    "trade" TEXT NOT NULL DEFAULT '',
    "contractType" TEXT,
    "isNominated" BOOLEAN,
    "contractSum" DOUBLE PRECISION,
    "payRate" DOUBLE PRECISION,
    "payRateUnit" TEXT,
    "skilledCount" INTEGER,
    "unskilledCount" INTEGER,
    "vendorId" TEXT,
    "vendorMargin" DOUBLE PRECISION,
    "employeeId" TEXT,
    "dailyRate" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "assignedWorkPackages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "blockAssignment" TEXT NOT NULL DEFAULT '',
    "mandaysEstimate" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HumanResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialResource" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "unit" TEXT NOT NULL DEFAULT '',
    "estimatedQty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "estimatedUnitCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalEstimatedCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "procurementSource" TEXT NOT NULL DEFAULT 'purchase',
    "supplierId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaterialResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentResource" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "ownership" TEXT NOT NULL DEFAULT 'company-owned',
    "internalCostPerDay" DOUBLE PRECISION,
    "rentalCostPerDay" DOUBLE PRECISION,
    "rentalSupplier" TEXT,
    "estimatedDays" INTEGER NOT NULL DEFAULT 0,
    "totalEstimatedCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EarnedValueRecord_projectId_idx" ON "EarnedValueRecord"("projectId");

-- CreateIndex
CREATE INDEX "ConstructionBaseline_projectId_idx" ON "ConstructionBaseline"("projectId");

-- CreateIndex
CREATE INDEX "ConstructionCalendar_projectId_idx" ON "ConstructionCalendar"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ConstructionSetting_scope_key" ON "ConstructionSetting"("scope");

-- CreateIndex
CREATE INDEX "ConstructionTask_projectId_idx" ON "ConstructionTask"("projectId");

-- CreateIndex
CREATE INDEX "HumanResource_projectId_idx" ON "HumanResource"("projectId");

-- CreateIndex
CREATE INDEX "MaterialResource_projectId_idx" ON "MaterialResource"("projectId");

-- CreateIndex
CREATE INDEX "EquipmentResource_projectId_idx" ON "EquipmentResource"("projectId");
