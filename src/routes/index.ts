import express from "express";
import product from "./products";

const router = express.Router();

router.use("/products", product);

export default router;
