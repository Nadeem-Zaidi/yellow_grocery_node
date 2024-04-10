/*
  Warnings:

  - Added the required column `package_size` to the `ColorSize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ColorSize" ADD COLUMN     "package_size" INTEGER NOT NULL;
