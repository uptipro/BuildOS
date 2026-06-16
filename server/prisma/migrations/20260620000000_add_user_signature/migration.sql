-- Add per-user signature storage (data URL / image string).
ALTER TABLE "User"
ADD COLUMN "signature" TEXT;
