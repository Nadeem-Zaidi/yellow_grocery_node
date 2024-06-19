/*
  Warnings:

  - You are about to drop the column `description` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Cat` table. All the data in the column will be lost.
  - Added the required column `left` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `right` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - The required column `tree_id` was added to the `Cat` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Cat" DROP COLUMN "description",
DROP COLUMN "images",
DROP COLUMN "path",
ADD COLUMN     "left" INTEGER NOT NULL,
ADD COLUMN     "right" INTEGER NOT NULL,
ADD COLUMN     "tree_id" TEXT NOT NULL;
