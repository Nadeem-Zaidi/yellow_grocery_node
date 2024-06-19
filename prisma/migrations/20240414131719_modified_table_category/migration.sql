/*
  Warnings:

  - You are about to drop the column `tree_node` on the `Category` table. All the data in the column will be lost.
  - Added the required column `tree_id` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "tree_node",
ADD COLUMN     "tree_id" TEXT NOT NULL;
