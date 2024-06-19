/*
  Warnings:

  - You are about to drop the column `price` on the `PackSizeVariation` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `PackSizeVariation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackSizeVariation" DROP COLUMN "price",
DROP COLUMN "quantity",
ADD COLUMN     "mrp_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "package_size" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],
    "parent_id" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
