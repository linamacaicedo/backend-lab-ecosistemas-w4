import express from "express";
import { createNewProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/", createNewProduct);
router.get("/", getProducts);

export default router;