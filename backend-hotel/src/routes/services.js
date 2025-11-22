// src/routes/services.js
import express from "express";
import { getServices, addService, updateService, deleteService } from "../controllers/serviceController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", protect, addService);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

export default router;