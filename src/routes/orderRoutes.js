import express from "express";
import {
  createNewOrder,
  getOrders,
  getMyOrders,
  getStoreOrders,
  getDeliveryAvailableOrders,
  getDeliveryAcceptedOrders,
  getSingleOrder,
  acceptOrder,
  declineOrder,
  markOrderDelivered,
  updateDeliveryPosition
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createNewOrder);

router.get("/consumer/:consumerId", getMyOrders);
router.get("/store/:storeId", getStoreOrders);
router.get("/delivery/available", getDeliveryAvailableOrders);
router.get("/delivery/accepted/:deliveryId", getDeliveryAcceptedOrders);

router.get("/", getOrders);
router.get("/:id", getSingleOrder);

router.put("/:id/accept", acceptOrder);
router.put("/:id/decline", declineOrder);
router.put("/:id/delivered", markOrderDelivered);
router.put("/:id/position", updateDeliveryPosition);

export default router;