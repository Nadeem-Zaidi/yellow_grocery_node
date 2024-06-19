-- DropForeignKey
ALTER TABLE "CategorySpec" DROP CONSTRAINT "CategorySpec_attributeid_fkey";

-- AddForeignKey
ALTER TABLE "CategorySpec" ADD CONSTRAINT "CategorySpec_attributeid_fkey" FOREIGN KEY ("attributeid") REFERENCES "Attribute"("attributename") ON DELETE RESTRICT ON UPDATE CASCADE;
