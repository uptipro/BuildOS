-- CreateTable
CREATE TABLE "ProjectSetup" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "basicInfo" JSONB,
    "projectType" JSONB,
    "humanResources" JSONB,
    "dailyReporting" JSONB,
    "materials" JSONB,
    "equipment" JSONB,
    "calendar" JSONB,
    "schedule" JSONB,
    "setupComplete" BOOLEAN NOT NULL DEFAULT false,
    "setupLocked" BOOLEAN NOT NULL DEFAULT false,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "completedSteps" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "auditLog" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectSetup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSetup_projectId_key" ON "ProjectSetup"("projectId");
