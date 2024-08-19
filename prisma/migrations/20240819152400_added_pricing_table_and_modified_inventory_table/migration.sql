/*
  Warnings:

  - Added the required column `measureUnitId` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stocksize` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory" ADD COLUMN     "measureUnitId" TEXT NOT NULL,
ADD COLUMN     "stocksize" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "pricing" (
    "id" TEXT NOT NULL,
    "mrp" DECIMAL(10,2),
    "sellingprice" DECIMAL(10,2),
    "discount" DECIMAL(10,2),
    "finalprice" DECIMAL(10,2),
    "productVariationId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pricing_id_key" ON "pricing"("id");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_measureUnitId_fkey" FOREIGN KEY ("measureUnitId") REFERENCES "MeasureUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing" ADD CONSTRAINT "pricing_productVariationId_fkey" FOREIGN KEY ("productVariationId") REFERENCES "ProductVariation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
