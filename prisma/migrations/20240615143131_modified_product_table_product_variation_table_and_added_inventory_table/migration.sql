/*
  Warnings:

  - Added the required column `updatedAt` to the `ProductSpecs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliverytimeunit` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mrp` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellinggprice` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductSpecs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariation" ADD COLUMN     "ShippingClass" TEXT,
ADD COLUMN     "complianceCertificates" TEXT,
ADD COLUMN     "deliveryTimeMax" DECIMAL(10,2),
ADD COLUMN     "deliveryTimeMin" DECIMAL(10,2),
ADD COLUMN     "deliverytimeunit" TEXT NOT NULL,
ADD COLUMN     "discount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "expirationDate" TIMESTAMP(3),
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "manufacturingDate" TIMESTAMP(3),
ADD COLUMN     "mrp" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "sellinggprice" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL,
    "productVariationId" TEXT NOT NULL,
    "reststockdate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "inventory_id_key" ON "inventory"("id");

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_deliverytimeunit_fkey" FOREIGN KEY ("deliverytimeunit") REFERENCES "MeasureUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productVariationId_fkey" FOREIGN KEY ("productVariationId") REFERENCES "ProductVariation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
