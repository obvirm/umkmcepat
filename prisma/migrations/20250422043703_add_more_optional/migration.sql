-- DropForeignKey
ALTER TABLE "LandingPage" DROP CONSTRAINT "LandingPage_userId_fkey";

-- DropIndex
DROP INDEX "LandingPage_userId_idx";

-- AlterTable
ALTER TABLE "LandingPage" ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "pricingInfo" TEXT,
ADD COLUMN     "socialLinks" JSONB,
ADD COLUMN     "testimonials" TEXT,
ALTER COLUMN "imagePublicIds" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "LandingPage" ADD CONSTRAINT "LandingPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
