/*
  Warnings:

  - You are about to drop the column `aln` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `numvalue` on the `ProductVariation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "aln",
DROP COLUMN "numvalue";
