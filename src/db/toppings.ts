import { Prisma } from "@prisma/client";
import prisma from ".";
import IRepo from "./repo";

export class ToppingRepo implements IRepo {
  async create(data: Prisma.ToppingCreateInput) {
    return await prisma.topping.create({
      data,
    });
  }

  async read(query: Prisma.ToppingWhereUniqueInput) {
    return await prisma.topping.findUnique({
      where: {
        ...query,
      },
    });
  }

  async readAll() {
    return await prisma.topping.findMany();
  }

  async update(
    query: Prisma.ToppingWhereUniqueInput,
    data: Prisma.ToppingUpdateInput
  ) {
    return await prisma.topping.update({
      where: {
        ...query,
      },
      data,
    });
  }

  async delete(query: Prisma.ToppingWhereUniqueInput) {
    return await prisma.topping.delete({
      where: {
        ...query,
      },
    });
  }
}
