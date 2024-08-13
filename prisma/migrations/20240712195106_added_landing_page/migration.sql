-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "landingPageId" TEXT;

-- CreateTable
CREATE TABLE "LandingPage" (
    "id" TEXT NOT NULL,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
