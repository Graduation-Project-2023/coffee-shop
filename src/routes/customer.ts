import express from "express";
import { isAdmin, isAuthenticated } from "../common/middleware";
import { create, update, read, readAll, remove } from "../common/crud";
import { UserRepo } from "../db/users";

const repo = new UserRepo();

const router = express.Router();

router.use(isAuthenticated);

router.use(isAdmin);

router.get("/", readAll(repo));

router.get("/:id", read(repo));

router.post("/", create(repo));

router.put("/:id", update(repo));

router.delete("/:id", remove(repo));

export default router;
