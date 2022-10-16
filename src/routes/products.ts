import express from "express";
import { isAdmin, isAuthenticated } from "../common/middleware";
import { create, read, readAll, update, remove } from "../common/crud";
import prisma from "../db";

const router = express.Router();

router.get("/", readAll(prisma.product.findMany));

router.use(isAuthenticated);

router.use(isAdmin);

router.get("/:id", read(prisma.product.findUnique));

router.post("/", create(prisma.product.create));

router.put("/:id", update(prisma.product.update));

router.delete("/:id", remove(prisma.product.delete));

export default router;
