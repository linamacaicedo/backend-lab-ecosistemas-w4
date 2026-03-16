import express from "express";
import {
  getStores,
  getMyStore,
  toggleStoreStatus
} from "../controllers/storeController.js";

const router = express.Router();

router.get("/", getStores);
router.get("/user/:userId", getMyStore);
router.put("/:id/status", toggleStoreStatus);

export default router;