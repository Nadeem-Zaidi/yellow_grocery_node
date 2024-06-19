-- DropForeignKey
ALTER TABLE "ProductSpecs" DROP CONSTRAINT "ProductSpecs_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "ProductSpecs" ADD CONSTRAINT "ProductSpecs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
