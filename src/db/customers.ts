import { Prisma } from "@prisma/client";
import prisma from ".";
import IRepo from "./repo";

export class CustomerRepo implements IRepo {
  async create(
    data: Prisma.CustomerCreateWithoutUserInput & {
      username: string;
      password: string;
    }
  ) {
    const { username, password, ...customer } = data;
    return await prisma.customer.create({
      data: {
        user: {
          connectOrCreate: {
            where: {
              username,
            },
            create: {
              username,
              password,
              role: "CUSTOMER",
            },
          },
        },
        ...customer,
      },
    });
  }

  async read(id: string) {
    return await prisma.customer.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async readAll() {
    return await prisma.customer.findMany();
  }

  async update(id: string, data: any) {
    return await prisma.customer.update({
      where: {
        userId: id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.customer.delete({
      where: {
        userId: id,
      },
    });
  }
}
