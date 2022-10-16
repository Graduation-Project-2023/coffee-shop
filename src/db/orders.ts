import prisma from ".";
import IRepo from "./repo";

export class OrderRepo implements IRepo {
  async create(data: any) {
    const { items, ...order } = data;
    return await prisma.order.create({
      data: {
        ...order,
        items: {
          create: items.map((item: any) => {
            const { toppings, ...itemData } = item;
            return {
              ...itemData,
              toppings: {
                create: toppings,
              },
            };
          }),
        },
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

  async update(id: string, data: any) {
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
