/*
  Warnings:

  - You are about to drop the column `description` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Genre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "description";
