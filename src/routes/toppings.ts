import express from "express";
import { isAdmin, isAuthenticated } from "../common/middleware";
import { create, read, readAll, update, remove } from "../common/crud";
import prisma from "../db";

const router = express.Router();

router.get("/", readAll(prisma.topping.findMany));

router.use(isAuthenticated);

router.use(isAdmin);

router.get("/:id", read(prisma.topping.findUnique));

router.post("/", create(prisma.topping.create));

router.put("/:id", update(prisma.topping.update));

router.delete("/:id", remove(prisma.topping.delete));

export default router;
