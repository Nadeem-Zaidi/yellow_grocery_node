/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Cat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cat_closure` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `left` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `right` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tree_node` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cat_closure" DROP CONSTRAINT "cat_closure_child_id_fkey";

-- DropForeignKey
ALTER TABLE "cat_closure" DROP CONSTRAINT "cat_closure_parent_id_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
DROP COLUMN "path",
ADD COLUMN     "left" INTEGER NOT NULL,
ADD COLUMN     "right" INTEGER NOT NULL,
ADD COLUMN     "tree_node" TEXT NOT NULL;

-- DropTable
DROP TABLE "Cat";

-- DropTable
DROP TABLE "cat_closure";
