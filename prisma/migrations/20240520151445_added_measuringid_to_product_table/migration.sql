/*
  Warnings:

  - You are about to drop the column `measuringunit` on the `ProductVariation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "measuringunit" TEXT;

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "measuringunit";
