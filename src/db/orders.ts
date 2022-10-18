import { OrderProduct, Prisma } from "@prisma/client";
import prisma from ".";
import IRepo from "./repo";
import { getOrderPrice } from "./repoUtils";

export class OrderRepo implements IRepo {
  async create(data: {
    customerId: string;
    items: Prisma.OrderProductCreateManyOrderInput[];
  }) {
    const { items, ...order } = data;
    const total = getOrderPrice(items);
    return await prisma.order.create({
      data: {
        customerId: order.customerId,
        orderDate: new Date(),
        total,
        items: {
          createMany: {
            data: items,
          },
        },
      },
      include: {
        items: true,
      },
    });
  }

  async read(id: string) {
    return await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });
  }

  async readAll() {
    return await prisma.order.findMany();
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    return await prisma.order.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
