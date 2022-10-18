import prisma from ".";
import { Prisma } from "@prisma/client";
import IRepo from "./repo";

export class ProductRepo implements IRepo {
  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
    });
  }

  async read(query: Prisma.ProductWhereUniqueInput) {
    return await prisma.product.findUnique({
      where: {
        ...query,
      },
    });
  }

  async readAll() {
    return await prisma.product.findMany();
  }

  async update(
    query: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput
  ) {
    return await prisma.product.update({
      where: {
        ...query,
      },
      data,
    });
  }

  async delete(query: Prisma.ProductWhereUniqueInput) {
    return await prisma.product.delete({
      where: {
        ...query,
      },
    });
  }
}
