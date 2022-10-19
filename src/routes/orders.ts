import express, { Request, Response } from "express";
import { isAdmin, isAuthenticated } from "../common/middleware";
import { create, read, readAll, update, remove } from "../common/crud";
import prisma from "../db";
import { OrderRepo } from "../db/orders";

const router = express.Router();

const repo = new OrderRepo();

// Work around adding customerId after authentication for the request body to be passed to orders object
const addCustomerId = (req: Request, res: Response, next: Function) => {
  const { user } = req;
  req.body.customerId = user.id;
  next();
};

router.use(isAuthenticated);

router.post("/", addCustomerId, create(repo));

router.use(isAdmin);

router.get("/", readAll(repo));

router.get("/:id", read(repo));

router.delete("/:id", remove(repo));

export default router;
