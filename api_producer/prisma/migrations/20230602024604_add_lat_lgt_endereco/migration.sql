/*
  Warnings:

  - Added the required column `lat` to the `endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lgt` to the `endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "endereco" ADD COLUMN     "lat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "lgt" DECIMAL(65,30) NOT NULL;
