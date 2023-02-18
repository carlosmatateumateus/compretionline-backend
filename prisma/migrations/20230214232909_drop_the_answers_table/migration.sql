/*
  Warnings:

  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_productId_fkey`;

-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_questionId_fkey`;

-- AlterTable
ALTER TABLE `questions` ADD COLUMN `answer` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `answers`;
