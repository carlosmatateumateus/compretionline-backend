/*
  Warnings:

  - You are about to drop the column `other` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `opened` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `photo` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `action` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `other`,
    ADD COLUMN `opened` BOOLEAN NOT NULL,
    MODIFY `photo` VARCHAR(191) NOT NULL,
    MODIFY `action` VARCHAR(191) NOT NULL;
