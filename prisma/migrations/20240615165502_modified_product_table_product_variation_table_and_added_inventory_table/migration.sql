-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_deliverytimeunit_fkey";

-- AlterTable
ALTER TABLE "ProductVariation" ALTER COLUMN "deliverytimeunit" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_deliverytimeunit_fkey" FOREIGN KEY ("deliverytimeunit") REFERENCES "MeasureUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
