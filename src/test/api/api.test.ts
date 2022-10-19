import supertest from "supertest";
import { expect } from "chai";
import app from "../../index";
import { UserRepo } from "../../db/users";
import jwt from "jsonwebtoken";
import prisma from "../../db";

const request = supertest(app);

describe("integration tests", () => {
  // running sequential api tests
  let customerToken: string;
  let adminToken: string;
  const testUser = {
    username: "testuser",
    password: "testpassword",
    role: "CUSTOMER",
    customer: {
      firstName: "test",
      lastName: "user",
    },
  };
  const testAdmin = {
    username: "testadmin",
    password: "testpassword",
    role: "ADMIN",
  };
  const testProduct = {
    name: "test product",
    price: 100,
    hasToppings: false,
  };

  after(async () => {
    const deleteProducts = prisma.product.deleteMany();
    const deleteOrders = prisma.order.deleteMany();
    const deleteCustomers = prisma.customer.deleteMany();
    const deleteUsers = prisma.user.deleteMany();
    const deleteOrderProducts = prisma.orderProduct.deleteMany();
    await prisma.$transaction([
      deleteOrderProducts,
      deleteOrders,
      deleteCustomers,
      deleteProducts,
      deleteUsers,
    ]);
    await prisma.$disconnect();
  });

  describe("auth", () => {
    it("should create a new user", async () => {
      const res = await request.post("/api/auth/signup").send(testUser);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
      customerToken = res.body.token;
    });

    it("should login a user", async () => {
      const res = await request.post("/api/auth/login").send({
        username: "testuser",
        password: "testpassword",
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
      customerToken = res.body.token;
    });

    it("should not login a user with invalid password", async () => {
      const res = await request.post("/api/auth/login").send({
        username: "test",
        password: "password1234",
      });
      expect(res.status).to.equal(400);
    });
  });

  describe("products", () => {
    it("should create a product with admin token", async () => {
      const res = await request
        .post("/api/products")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(testProduct);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");
    });

    it("should not create a product with customer token", async () => {
      const res = await request
        .post("/api/products")
        .set("Authorization", `Bearer ${customerToken}`)
        .send({
          name: "test product",
          description: "test description",
          price: 100,
          quantity: 10,
        });
      expect(res.status).to.equal(403);
    });
  });
});
