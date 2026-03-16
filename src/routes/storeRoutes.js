import express from "express";
import { createNewStore, getStores } from "../controllers/storeController.js";

const router = express.Router();

router.post("/", createNewStore);
router.get("/", getStores);

export default router;