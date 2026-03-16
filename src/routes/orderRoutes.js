import express from "express";
import { createNewOrder, getOrders, acceptOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createNewOrder);
router.get("/", getOrders);
router.put("/accept", acceptOrder);

export default router;