import prisma from ".";
import IRepo from "./repo";

export class UserRepo implements IRepo {
  async create(data: any) {
    return await prisma.user.create({
      data,
    });
  }

  async read(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async readAll() {
    return await prisma.user.findMany();
  }

  async update(id: string, data: any) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
