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
    if (!items) {
      throw "order must include at least one item";
    }
    return await prisma.order.create({
      data: {
        orderDate: new Date(),
        customer: {
          connect: {
            userId: order.customerId,
          },
        },
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

  async read(query: Prisma.OrderWhereUniqueInput) {
    return await prisma.order.findUnique({
      where: {
        ...query,
      },
      include: {
        items: true,
      },
    });
  }

  async readAll() {
    return await prisma.order.findMany();
  }

  async update(
    query: Prisma.OrderWhereUniqueInput,
    data: Prisma.OrderUpdateInput
  ) {
    throw new Error("Method not implemented.");
  }

  async delete(query: Prisma.OrderWhereUniqueInput) {
    return await prisma.order.delete({
      where: {
        ...query,
      },
    });
  }
}
