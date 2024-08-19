/*
  Warnings:

  - You are about to drop the column `discount` on the `productvariation` table. All the data in the column will be lost.
  - You are about to drop the column `mrp` on the `productvariation` table. All the data in the column will be lost.
  - You are about to drop the column `sellingprice` on the `productvariation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "productvariation" DROP COLUMN "discount",
DROP COLUMN "mrp",
DROP COLUMN "sellingprice";
