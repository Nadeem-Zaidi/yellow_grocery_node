-- AlterTable
ALTER TABLE "ProductVariation" ADD COLUMN     "categoryname" TEXT;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_categoryname_fkey" FOREIGN KEY ("categoryname") REFERENCES "Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
