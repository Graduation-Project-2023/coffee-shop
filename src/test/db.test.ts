import { OrderRepo } from "../db/orders";
import { CustomerRepo } from "../db/customers";
import prisma from "../db";
import { expect } from "chai";
import { ProductRepo } from "../db/products";
import { UserRepo } from "../db/users";

const orderRepo = new OrderRepo();
const customerRepo = new CustomerRepo();
const userRepo = new UserRepo();
const productRepo = new ProductRepo();

describe("orders", () => {
  let customer1Id: string;
  let product1Id: string;
  let product2Id: string;

  before(async () => {
    const customer = await userRepo.create({
      username: "customer1",
      password: "password",
      role: "CUSTOMER",
      customer: {
        firstName: "customer1",
        lastName: "customer1",
      },
    });

    customer1Id = customer.id;

    const product1 = await productRepo.create({
      name: "test",
      price: 30,
      hasToppings: false,
    });

    const product2 = await productRepo.create({
      name: "test",
      price: 30,
      hasToppings: false,
    });

    product1Id = product1.id;
    product2Id = product2.id;
  });

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

  it("should create an order", async () => {
    const order = await orderRepo.create({
      customerId: customer1Id,
      items: [
        {
          productId: product1Id,
          description: "Mocha with vanilla",
          price: 35,
          size: "MEDIUM",
          sugar: "FULL",
        },
        {
          productId: product2Id,
          description: "Cappucino with chocolate",
          price: 40,
          size: "LARGE",
          sugar: "NONE",
        },
      ],
    });
    expect(order).to.have.property("id");
    expect(order.items).to.have.length(2);
  });
});
