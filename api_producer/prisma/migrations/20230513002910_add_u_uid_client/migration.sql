/*
  Warnings:

  - A unique constraint covering the columns `[uuid_firebase]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid_firebase` to the `cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cliente" ADD COLUMN     "uuid_firebase" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cliente_uuid_firebase_key" ON "cliente"("uuid_firebase");
