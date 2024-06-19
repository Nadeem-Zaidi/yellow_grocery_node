/*
  Warnings:

  - You are about to drop the column `sellinggprice` on the `ProductVariation` table. All the data in the column will be lost.
  - Added the required column `sellingprice` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "sellinggprice",
ADD COLUMN     "sellingprice" DECIMAL(15,2) NOT NULL;
