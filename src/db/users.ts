import { Customer, Prisma, User } from "@prisma/client";
import prisma from ".";
import IRepo from "./repo";

export class UserRepo implements IRepo {
  async createCustomer(
    data: Prisma.UserCreateWithoutCustomerInput & {
      customer: Prisma.XOR<
        Prisma.CustomerCreateWithoutUserInput,
        Prisma.CustomerUncheckedCreateWithoutUserInput
      >;
    }
  ): Promise<
    | User & {
        customer: Customer | null;
      }
  > {
    const { customer, ...userData } = data;
    return await prisma.user.create({
      data: {
        ...userData,
        customer: {
          create: customer,
        },
      },
      include: {
        customer: true,
      },
    });
  }

  async create(
    data: Prisma.UserCreateWithoutCustomerInput & {
      customer?: Prisma.XOR<
        Prisma.CustomerCreateWithoutUserInput,
        Prisma.CustomerUncheckedCreateWithoutUserInput
      >;
    }
  ): Promise<
    | User & {
        customer?: Customer | null;
      }
  > {
    const { customer, ...userData } = data;
    if (data.role === "CUSTOMER") {
      if (!data.customer) {
        throw new Error("Customer data is required");
      }
      return await this.createCustomer({
        ...userData,
        customer: data.customer,
      });
    }
    throw new Error("Can't sign up as admin");
  }

  async read(query: Prisma.UserWhereUniqueInput): Promise<
    | (User & {
        customer?: Customer | null;
      })
    | null
  > {
    return await prisma.user.findUnique({
      where: {
        ...query,
      },
      include: {
        customer: true,
      },
    });
  }

  async readAll() {
    return await prisma.user.findMany();
  }

  async update(
    query: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ) {
    return await prisma.user.update({
      where: {
        ...query,
      },
      data,
    });
  }

  async delete(query: Prisma.UserWhereUniqueInput) {
    return await prisma.user.delete({
      where: {
        ...query,
      },
    });
  }
}
