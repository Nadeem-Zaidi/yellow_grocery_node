/*
  Warnings:

  - You are about to drop the column `attributeid` on the `CategorySpec` table. All the data in the column will be lost.
  - Added the required column `attributename` to the `CategorySpec` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategorySpec" DROP CONSTRAINT "CategorySpec_attributeid_fkey";

-- AlterTable
ALTER TABLE "CategorySpec" DROP COLUMN "attributeid",
ADD COLUMN     "attributename" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CategorySpec" ADD CONSTRAINT "CategorySpec_attributename_fkey" FOREIGN KEY ("attributename") REFERENCES "Attribute"("attributename") ON DELETE RESTRICT ON UPDATE CASCADE;
