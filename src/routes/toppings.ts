import express from "express";
import { isAdmin, isAuthenticated } from "../common/middleware";
import { create, read, readAll, update, remove } from "../common/crud";
import { ToppingRepo } from "../db/toppings";

const router = express.Router();
const repo = new ToppingRepo();

router.get("/", readAll(repo));

router.use(isAuthenticated);

router.use(isAdmin);

router.get("/:id", read(repo));

router.post("/", create(repo));

router.put("/:id", update(repo));

router.delete("/:id", remove(repo));

export default router;
