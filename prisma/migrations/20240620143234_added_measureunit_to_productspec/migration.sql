/*
  Warnings:

  - Added the required column `unit` to the `ProductSpecs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductSpecs" ADD COLUMN     "unit" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductSpecs" ADD CONSTRAINT "ProductSpecs_unit_fkey" FOREIGN KEY ("unit") REFERENCES "MeasureUnit"("unit") ON DELETE RESTRICT ON UPDATE CASCADE;
