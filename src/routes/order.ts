import express from "express";
import { isAdmin, isAuthenticated } from "../common/middleware";
import { create, read, readAll, update, remove } from "../common/crud";
import prisma from "../db";
import { OrderRepo } from "../db/orders";

const router = express.Router();

const repo = new OrderRepo();

router.use(isAuthenticated);

router.use(isAdmin);

router.get("/", readAll(repo));

router.get("/:id", read(repo));

router.post("/", create(repo));

router.put("/:id", update(repo));

router.delete("/:id", remove(repo));

export default router;
