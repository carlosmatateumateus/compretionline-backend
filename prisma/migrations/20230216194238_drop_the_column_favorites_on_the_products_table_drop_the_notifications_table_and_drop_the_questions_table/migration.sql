/*
  Warnings:

  - You are about to drop the column `favorites` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_productId_fkey`;

-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_userId_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_userId_fkey`;

-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `questions_productId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `favorites`;

-- DropTable
DROP TABLE `favorites`;

-- DropTable
DROP TABLE `notifications`;

-- DropTable
DROP TABLE `questions`;
