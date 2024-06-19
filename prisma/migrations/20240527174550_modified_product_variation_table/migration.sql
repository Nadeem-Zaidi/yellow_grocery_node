/*
  Warnings:

  - You are about to drop the column `categorypath` on the `ProductVariation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_categorypath_fkey";

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "categorypath",
ADD COLUMN     "categoryid" TEXT;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
