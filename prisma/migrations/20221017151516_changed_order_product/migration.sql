/*
  Warnings:

  - You are about to drop the column `quantity` on the `order_products` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `order_toppings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `order_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_toppings" DROP CONSTRAINT "order_toppings_orderProductId_fkey";

-- DropForeignKey
ALTER TABLE "order_toppings" DROP CONSTRAINT "order_toppings_toppingId_fkey";

-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "quantity",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "total";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "toppings" ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "order_toppings";
