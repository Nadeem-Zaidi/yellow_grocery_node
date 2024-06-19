/*
  Warnings:

  - You are about to drop the column `categoryname` on the `ProductVariation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductSpecs" DROP CONSTRAINT "ProductSpecs_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_categoryname_fkey";

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "categoryname",
ADD COLUMN     "categorypath" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Categories_path_key" ON "Categories"("path");

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_categorypath_fkey" FOREIGN KEY ("categorypath") REFERENCES "Categories"("path") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecs" ADD CONSTRAINT "ProductSpecs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
