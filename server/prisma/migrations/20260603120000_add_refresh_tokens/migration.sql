-- Add persisted refresh token fields for rotating session management
ALTER TABLE "User"
ADD COLUMN "refreshTokenHash" TEXT,
ADD COLUMN "refreshTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN "assignedApps" TEXT[] DEFAULT ARRAY['ess']::TEXT[];
