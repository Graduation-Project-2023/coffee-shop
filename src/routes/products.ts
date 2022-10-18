import express from "express";
import { isAdmin, isAuthenticated } from "../common/middleware";
import { create, read, readAll, update, remove } from "../common/crud";
import { ProductRepo } from "../db/products";

const router = express.Router();
const repo = new ProductRepo();

router.get("/", readAll(repo));

router.use(isAuthenticated);

router.use(isAdmin);

router.post("/", create(repo));

router.get("/:id", read(repo));

router.put("/:id", update(repo));

router.delete("/:id", remove(repo));

export default router;
