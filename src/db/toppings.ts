import prisma from ".";
import IRepo from "./repo";

export class ToppingRepo implements IRepo {
  async create(data: any) {
    return await prisma.topping.create({
      data,
    });
  }

  async read(id: string) {
    return await prisma.topping.findUnique({
      where: {
        id,
      },
    });
  }

  async readAll() {
    return await prisma.topping.findMany();
  }

  async update(id: string, data: any) {
    return await prisma.topping.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.topping.delete({
      where: {
        id,
      },
    });
  }
}
