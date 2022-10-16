import supertest from "supertest";
import { Prisma, PrismaClient } from "@prisma/client";
import { create, update, read, remove } from "../common/crud";
import express from "express";
import { expect } from "chai";
import { UserRepo } from "../db/users";

const app = express();

// connect with prisma
const prisma = new PrismaClient();
const repo = new UserRepo();

app
  .use(express.json())
  .post("/create", create(repo))
  .put("/update/:id", update(repo))
  .get("/read/:id", read(repo))
  .delete("/delete/:id", remove(repo));

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

  it("should create an entry", async () => {
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

  it("should update an entry", async () => {
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

  it("should read an entry", async () => {
    const response = await request.get(`/read/${user.id}`);
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("test3");
    expect(response.body.password).to.equal("test3");
    expect(response.body.role).to.equal("ADMIN");
  });

  it("should delete an entry", async () => {
    const response = await request.delete(`/delete/${user.id}`);
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("test3");
    expect(response.body.password).to.equal("test3");
    expect(response.body.role).to.equal("ADMIN");
  });
});
