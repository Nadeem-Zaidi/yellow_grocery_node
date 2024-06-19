/*
  Warnings:

  - You are about to drop the column `measureabbrevation` on the `MeasureUnit` table. All the data in the column will be lost.
  - You are about to drop the column `measureunitname` on the `MeasureUnit` table. All the data in the column will be lost.
  - Added the required column `abbreviation` to the `MeasureUnit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MeasureUnit_measureunitname_key";

-- AlterTable
ALTER TABLE "MeasureUnit" DROP COLUMN "measureabbrevation",
DROP COLUMN "measureunitname",
ADD COLUMN     "abbreviation" TEXT NOT NULL;
