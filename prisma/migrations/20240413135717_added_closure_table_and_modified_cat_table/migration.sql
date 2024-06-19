/*
  Warnings:

  - You are about to drop the column `left` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `right` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `tree_id` on the `Cat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cat" DROP COLUMN "left",
DROP COLUMN "right",
DROP COLUMN "tree_id";

-- CreateTable
CREATE TABLE "cat_closure" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "child_id" TEXT NOT NULL,

    CONSTRAINT "cat_closure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cat_closure" ADD CONSTRAINT "cat_closure_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Cat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cat_closure" ADD CONSTRAINT "cat_closure_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Cat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
