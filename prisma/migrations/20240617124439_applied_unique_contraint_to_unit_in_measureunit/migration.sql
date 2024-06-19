/*
  Warnings:

  - You are about to drop the column `measureUnitId` on the `CategorySpec` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unit]` on the table `MeasureUnit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unit` to the `MeasureUnit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategorySpec" DROP CONSTRAINT "CategorySpec_measureUnitId_fkey";

-- AlterTable
ALTER TABLE "CategorySpec" DROP COLUMN "measureUnitId",
ADD COLUMN     "measureunit" TEXT;

-- AlterTable
ALTER TABLE "MeasureUnit" ADD COLUMN     "unit" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MeasureUnit_unit_key" ON "MeasureUnit"("unit");

-- AddForeignKey
ALTER TABLE "CategorySpec" ADD CONSTRAINT "CategorySpec_measureunit_fkey" FOREIGN KEY ("measureunit") REFERENCES "MeasureUnit"("unit") ON DELETE SET NULL ON UPDATE CASCADE;
