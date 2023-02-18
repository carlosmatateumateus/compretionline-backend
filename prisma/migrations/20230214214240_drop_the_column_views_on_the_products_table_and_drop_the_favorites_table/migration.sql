/*
  Warnings:

  - You are about to drop the column `views` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_productId_fkey`;

-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_userId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `views`;

-- DropTable
DROP TABLE `favorites`;
