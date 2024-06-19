/*
  Warnings:

  - You are about to drop the column `dimensions` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `mrp` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `sellingprice` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `ProductVariation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "dimensions",
DROP COLUMN "discount",
DROP COLUMN "mrp",
DROP COLUMN "sellingprice",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "ProductSpecs" (
    "id" TEXT NOT NULL,
    "attributename" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSpecs_id_key" ON "ProductSpecs"("id");

-- AddForeignKey
ALTER TABLE "ProductSpecs" ADD CONSTRAINT "ProductSpecs_attributename_fkey" FOREIGN KEY ("attributename") REFERENCES "Attribute"("attributename") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecs" ADD CONSTRAINT "ProductSpecs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
