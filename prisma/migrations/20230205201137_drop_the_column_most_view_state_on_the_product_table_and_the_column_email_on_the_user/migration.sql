/*
  Warnings:

  - You are about to drop the column `mostView` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `mostView`,
    DROP COLUMN `state`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`;
