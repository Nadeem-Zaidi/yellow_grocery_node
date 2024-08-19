/*
  Warnings:

  - You are about to drop the `ProductVariation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductSpecs" DROP CONSTRAINT "ProductSpecs_productVariationId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_categoryid_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_deliverytimeunit_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_productId_fkey";

-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_productVariationId_fkey";

-- DropForeignKey
ALTER TABLE "pricing" DROP CONSTRAINT "pricing_productVariationId_fkey";

-- DropTable
DROP TABLE "ProductVariation";

-- CreateTable
CREATE TABLE "productvariation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "images" TEXT[],
    "tags" TEXT[],
    "sku" TEXT NOT NULL,
    "sellingprice" DECIMAL(15,2) NOT NULL,
    "mrp" DECIMAL(15,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "manufacturingDate" TIMESTAMP(3),
    "expirationDate" TIMESTAMP(3),
    "complianceCertificates" TEXT,
    "ShippingClass" TEXT,
    "deliveryTimeMin" DECIMAL(10,2),
    "deliveryTimeMax" DECIMAL(10,2),
    "categoryid" TEXT,
    "deliverytimeunit" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "productvariation_id_key" ON "productvariation"("id");

-- AddForeignKey
ALTER TABLE "productvariation" ADD CONSTRAINT "productvariation_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productvariation" ADD CONSTRAINT "productvariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productvariation" ADD CONSTRAINT "productvariation_deliverytimeunit_fkey" FOREIGN KEY ("deliverytimeunit") REFERENCES "MeasureUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecs" ADD CONSTRAINT "ProductSpecs_productVariationId_fkey" FOREIGN KEY ("productVariationId") REFERENCES "productvariation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productVariationId_fkey" FOREIGN KEY ("productVariationId") REFERENCES "productvariation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing" ADD CONSTRAINT "pricing_productVariationId_fkey" FOREIGN KEY ("productVariationId") REFERENCES "productvariation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
