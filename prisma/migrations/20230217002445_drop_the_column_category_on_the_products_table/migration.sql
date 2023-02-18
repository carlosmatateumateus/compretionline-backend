/*
  Warnings:

  - You are about to drop the column `category` on the `products` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `products_title_idx` ON `products`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `category`;
