/*
  Warnings:

  - The `charisma` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `consistency` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `doubles` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mentality` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `scoring` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Player" ADD COLUMN     "pressure_handling" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "charisma",
ADD COLUMN     "charisma" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "consistency",
ADD COLUMN     "consistency" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "doubles",
ADD COLUMN     "doubles" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "mentality",
ADD COLUMN     "mentality" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "scoring",
ADD COLUMN     "scoring" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."TrainingSession" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "playerId" UUID NOT NULL,
    "skillType" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "skillGained" INTEGER,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TrainingSession" ADD CONSTRAINT "TrainingSession_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
