-- AlterTable
ALTER TABLE "ColorSize" ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "newprice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "unit" TEXT;
