/*
  Warnings:

  - You are about to drop the column `parent_id` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parent_id_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parent_id",
ADD COLUMN     "parentid" TEXT;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentid_fkey" FOREIGN KEY ("parentid") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
