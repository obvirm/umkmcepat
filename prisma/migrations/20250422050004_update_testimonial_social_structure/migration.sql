/*
  Warnings:

  - You are about to drop the column `pricingInfo` on the `LandingPage` table. All the data in the column will be lost.
  - The `testimonials` column on the `LandingPage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LandingPage" DROP COLUMN "pricingInfo",
DROP COLUMN "testimonials",
ADD COLUMN     "testimonials" JSONB;
