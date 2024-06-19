/*
  Warnings:

  - You are about to drop the column `parentid` on the `Category` table. All the data in the column will be lost.
  - Added the required column `path` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentid_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parentid",
ADD COLUMN     "path" TEXT NOT NULL;
