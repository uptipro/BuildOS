-- CreateTable
CREATE TABLE "ConstructionIssue" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "issueNumber" TEXT NOT NULL,
    "dateRaised" TEXT NOT NULL,
    "raisedBy" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "taskId" TEXT NOT NULL DEFAULT '',
    "impactTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rootCause" TEXT NOT NULL DEFAULT '',
    "targetDate" TEXT NOT NULL DEFAULT '',
    "actions" TEXT NOT NULL DEFAULT '',
    "ownerId" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Open',
    "resolutionNotes" TEXT NOT NULL DEFAULT '',
    "closedAt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConstructionIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangeRequest" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "crNumber" TEXT NOT NULL,
    "dateRaised" TEXT NOT NULL,
    "raisedBy" TEXT NOT NULL,
    "changeTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT NOT NULL DEFAULT '',
    "reason" TEXT NOT NULL DEFAULT '',
    "summaryTaskId" TEXT NOT NULL DEFAULT '',
    "taskId" TEXT NOT NULL DEFAULT '',
    "scopeImpact" TEXT NOT NULL DEFAULT '',
    "scheduleImpactDays" INTEGER NOT NULL DEFAULT 0,
    "costImpact" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "qualityImpact" TEXT NOT NULL DEFAULT '',
    "stakeholderImpact" TEXT NOT NULL DEFAULT '',
    "recommendedAction" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Proposed',
    "approverId" TEXT,
    "approvedAt" TEXT,
    "approvalNotes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChangeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDelay" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL DEFAULT '',
    "taskName" TEXT NOT NULL DEFAULT '',
    "stagePhase" TEXT NOT NULL DEFAULT '',
    "plannedEndDate" TEXT NOT NULL DEFAULT '',
    "daysDelayed" INTEGER NOT NULL DEFAULT 0,
    "rootCause" TEXT NOT NULL DEFAULT '',
    "recoveryPlan" TEXT NOT NULL DEFAULT '',
    "recoveryActions" TEXT NOT NULL DEFAULT '',
    "ownerId" TEXT NOT NULL DEFAULT '',
    "revisedEndDate" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectDelay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stakeholder" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT '',
    "email" TEXT,
    "phone" TEXT,
    "influenceLevel" TEXT NOT NULL DEFAULT 'Medium',
    "impactLevel" TEXT NOT NULL DEFAULT 'Medium',
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stakeholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualityNcr" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "ncrId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "taskId" TEXT NOT NULL DEFAULT '',
    "raisedBy" TEXT NOT NULL DEFAULT '',
    "correctiveAction" TEXT NOT NULL DEFAULT '',
    "responsiblePerson" TEXT NOT NULL DEFAULT '',
    "targetCloseDate" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QualityNcr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HseRecord" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "staffMember" TEXT NOT NULL,
    "competency" TEXT NOT NULL DEFAULT '',
    "dateObtained" TEXT NOT NULL DEFAULT '',
    "expiryDate" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Valid',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HseRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationLog" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "from" TEXT NOT NULL DEFAULT '',
    "to" TEXT NOT NULL DEFAULT '',
    "channel" TEXT NOT NULL DEFAULT 'other',
    "subject" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "followUpDate" TEXT,
    "status" TEXT NOT NULL DEFAULT 'sent',
    "createdBy" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunicationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingAllocation" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT '',
    "totalAllocated" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dateAllocated" TEXT NOT NULL DEFAULT '',
    "reference" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundingAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingRelease" (
    "id" TEXT NOT NULL,
    "allocationId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dateReleased" TEXT NOT NULL DEFAULT '',
    "reference" TEXT NOT NULL DEFAULT '',
    "releasedTo" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundingRelease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disbursement" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "taskId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "date" TEXT NOT NULL DEFAULT '',
    "source" TEXT NOT NULL DEFAULT 'finance',
    "reference" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "allocatedTo" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disbursement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyReport" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "reportDate" TEXT NOT NULL,
    "weather" JSONB,
    "submittedBy" TEXT NOT NULL DEFAULT '',
    "submittedAt" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "unlockedBy" TEXT,
    "unlockReason" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TEXT,
    "reviewNotes" TEXT,
    "manpower" JSONB NOT NULL DEFAULT '[]',
    "equipment" JSONB NOT NULL DEFAULT '[]',
    "materials" JSONB NOT NULL DEFAULT '[]',
    "scope" JSONB NOT NULL DEFAULT '[]',
    "expenses" JSONB NOT NULL DEFAULT '[]',
    "communicationLog" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentFolder" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "parentFolderId" TEXT,
    "name" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentFile" (
    "id" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL DEFAULT '',
    "version" INTEGER NOT NULL DEFAULT 1,
    "uploadedBy" TEXT NOT NULL DEFAULT '',
    "uploadedAt" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConstructionIssue_projectId_idx" ON "ConstructionIssue"("projectId");

-- CreateIndex
CREATE INDEX "ChangeRequest_projectId_idx" ON "ChangeRequest"("projectId");

-- CreateIndex
CREATE INDEX "ProjectDelay_projectId_idx" ON "ProjectDelay"("projectId");

-- CreateIndex
CREATE INDEX "Stakeholder_projectId_idx" ON "Stakeholder"("projectId");

-- CreateIndex
CREATE INDEX "QualityNcr_projectId_idx" ON "QualityNcr"("projectId");

-- CreateIndex
CREATE INDEX "HseRecord_projectId_idx" ON "HseRecord"("projectId");

-- CreateIndex
CREATE INDEX "CommunicationLog_projectId_idx" ON "CommunicationLog"("projectId");

-- CreateIndex
CREATE INDEX "FundingAllocation_projectId_idx" ON "FundingAllocation"("projectId");

-- CreateIndex
CREATE INDEX "FundingRelease_projectId_idx" ON "FundingRelease"("projectId");

-- CreateIndex
CREATE INDEX "FundingRelease_allocationId_idx" ON "FundingRelease"("allocationId");

-- CreateIndex
CREATE INDEX "Disbursement_projectId_idx" ON "Disbursement"("projectId");

-- CreateIndex
CREATE INDEX "DailyReport_projectId_idx" ON "DailyReport"("projectId");

-- CreateIndex
CREATE INDEX "DocumentFolder_projectId_idx" ON "DocumentFolder"("projectId");

-- CreateIndex
CREATE INDEX "DocumentFile_projectId_idx" ON "DocumentFile"("projectId");

-- CreateIndex
CREATE INDEX "DocumentFile_folderId_idx" ON "DocumentFile"("folderId");
