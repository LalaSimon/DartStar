/*
  Warnings:

  - You are about to drop the column `lastName` on the `Player` table. All the data in the column will be lost.
  - Added the required column `lastname` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "lastName",
ADD COLUMN     "lastname" TEXT NOT NULL;
