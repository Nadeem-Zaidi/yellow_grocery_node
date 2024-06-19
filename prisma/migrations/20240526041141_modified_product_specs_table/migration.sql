/*
  Warnings:

  - Added the required column `productVariationId` to the `ProductSpecs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductSpecs" ADD COLUMN     "productVariationId" TEXT NOT NULL,
ALTER COLUMN "alnvalue" DROP NOT NULL,
ALTER COLUMN "numvalue" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductSpecs" ADD CONSTRAINT "ProductSpecs_productVariationId_fkey" FOREIGN KEY ("productVariationId") REFERENCES "ProductVariation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
