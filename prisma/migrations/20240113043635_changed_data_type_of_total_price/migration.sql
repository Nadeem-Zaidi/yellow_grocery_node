/*
  Warnings:

  - Added the required column `updatedAt` to the `PackSizeVariation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "packSizeVariationId" TEXT;

-- AlterTable
ALTER TABLE "PackSizeVariation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_packSizeVariationId_fkey" FOREIGN KEY ("packSizeVariationId") REFERENCES "PackSizeVariation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
