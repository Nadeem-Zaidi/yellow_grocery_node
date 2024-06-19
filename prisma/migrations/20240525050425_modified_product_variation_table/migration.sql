/*
  Warnings:

  - You are about to drop the column `categorySpecId` on the `ProductVariation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_categorySpecId_fkey";

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "categorySpecId";
