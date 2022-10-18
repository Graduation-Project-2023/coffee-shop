/*
  Warnings:

  - You are about to drop the column `orderId` on the `order_toppings` table. All the data in the column will be lost.
  - Changed the type of `size` on the `order_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sugar` on the `order_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `orderProductId` to the `order_toppings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasToppings` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "SUGAR" AS ENUM ('NONE', 'HALF', 'FULL');

-- DropForeignKey
ALTER TABLE "order_toppings" DROP CONSTRAINT "order_toppings_orderId_fkey";

-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "size",
ADD COLUMN     "size" "SIZE" NOT NULL,
DROP COLUMN "sugar",
ADD COLUMN     "sugar" "SUGAR" NOT NULL;

-- AlterTable
ALTER TABLE "order_toppings" DROP COLUMN "orderId",
ADD COLUMN     "orderProductId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "total" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "hasToppings" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "order_toppings" ADD CONSTRAINT "order_toppings_orderProductId_fkey" FOREIGN KEY ("orderProductId") REFERENCES "order_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
