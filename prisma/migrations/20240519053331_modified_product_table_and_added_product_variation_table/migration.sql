/*
  Warnings:

  - You are about to drop the column `packSizeVariationId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ColorSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackSizeVariation` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AttributeDataType" AS ENUM ('ALN', 'NUMERIC');

-- DropForeignKey
ALTER TABLE "ColorSize" DROP CONSTRAINT "ColorSize_product_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_packSizeVariationId_fkey";

-- DropForeignKey
ALTER TABLE "PackSizeVariation" DROP CONSTRAINT "PackSizeVariation_product_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "packSizeVariationId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "images",
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "ColorSize";

-- DropTable
DROP TABLE "PackSizeVariation";

-- CreateTable
CREATE TABLE "MeasureUnit" (
    "id" TEXT NOT NULL,
    "measureunitname" TEXT NOT NULL,
    "measureabbrevation" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeasureUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "attributename" TEXT NOT NULL,
    "description" TEXT,
    "datatype" "AttributeDataType" NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategorySpec" (
    "id" TEXT NOT NULL,
    "categoryid" TEXT NOT NULL,
    "attributeid" TEXT NOT NULL,
    "measureUnitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategorySpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariation" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "categorySpecId" TEXT NOT NULL,
    "numvalue" INTEGER,
    "aln" TEXT,
    "measuringunit" TEXT,
    "images" TEXT[],
    "tags" TEXT[],
    "mrp" DOUBLE PRECISION NOT NULL,
    "sellingprice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MeasureUnit_measureunitname_key" ON "MeasureUnit"("measureunitname");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_attributename_key" ON "Attribute"("attributename");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariation_id_key" ON "ProductVariation"("id");

-- AddForeignKey
ALTER TABLE "CategorySpec" ADD CONSTRAINT "CategorySpec_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategorySpec" ADD CONSTRAINT "CategorySpec_attributeid_fkey" FOREIGN KEY ("attributeid") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategorySpec" ADD CONSTRAINT "CategorySpec_measureUnitId_fkey" FOREIGN KEY ("measureUnitId") REFERENCES "MeasureUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_categorySpecId_fkey" FOREIGN KEY ("categorySpecId") REFERENCES "CategorySpec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
