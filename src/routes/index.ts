import express from "express";
import auth from "./auth";
import product from "./products";
import order from "./orders";

const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/orders", order);

export default router;
