/*
  Warnings:

  - Added the required column `alnvalue` to the `ProductSpecs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numvalue` to the `ProductSpecs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductSpecs" ADD COLUMN     "alnvalue" TEXT NOT NULL,
ADD COLUMN     "numvalue" DECIMAL(65,30) NOT NULL;
