import supertest from "supertest";
import { Prisma, PrismaClient } from "@prisma/client";
import { create, update, read, remove } from "../common/crud";
import express from "express";
import { expect } from "chai";

const app = express();

// connect with prisma
const prisma = new PrismaClient();

app
  .use(express.json())
  .post("/create", create(prisma.user.create))
  .put("/update/:id", update(prisma.user.update))
  .get("/read/:id", read(prisma.user.findUnique))
  .delete("/delete/:id", remove(prisma.user.delete));

const request = supertest(app);

describe("crud", () => {
  let user: Prisma.UserCreateInput = {
    username: "test",
    password: "test",
    role: "ADMIN",
  };

  before(async () => {
    user = await prisma.user.create({
      data: user,
    });
  });

  after(async () => {
    const deleteUsers = prisma.user.deleteMany();
    await prisma.$transaction([deleteUsers]);
    await prisma.$disconnect();
  });

  it("should create a user", async () => {
    const response = await request.post("/create").send({
      username: "test2",
      password: "test2",
      role: "ADMIN",
    });
    expect(response.status).to.equal(201);
    expect(response.body.username).to.equal("test2");
    expect(response.body.password).to.equal("test2");
    expect(response.body.role).to.equal("ADMIN");
  });

  it("should update a user", async () => {
    const response = await request.put(`/update/${user.id}`).send({
      username: "test3",
      password: "test3",
      role: "ADMIN",
    });
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("test3");
    expect(response.body.password).to.equal("test3");
    expect(response.body.role).to.equal("ADMIN");
  });

  it("should read a user", async () => {
    const response = await request.get(`/read/${user.id}`);
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("test3");
    expect(response.body.password).to.equal("test3");
    expect(response.body.role).to.equal("ADMIN");
  });

  it("should delete a user", async () => {
    const response = await request.delete(`/delete/${user.id}`);
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("test3");
    expect(response.body.password).to.equal("test3");
    expect(response.body.role).to.equal("ADMIN");
  });
});
