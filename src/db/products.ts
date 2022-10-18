import prisma from ".";
import { Prisma } from "@prisma/client";
import IRepo from "./repo";

export class ProductRepo implements IRepo {
  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
    });
  }

  async read(id: string) {
    return await prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async readAll() {
    return await prisma.product.findMany();
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return await prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
