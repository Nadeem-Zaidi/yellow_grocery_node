/*
  Warnings:

  - You are about to drop the column `attributeId` on the `ProductVariation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_attributeId_fkey";

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "attributeId";
