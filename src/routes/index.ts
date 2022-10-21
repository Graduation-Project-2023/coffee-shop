import express from "express";
import auth from "./auth";
import product from "./products";
import order from "./orders";
import topping from "./toppings";
const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/toppings", topping);
router.use("/orders", order);

export default router;
