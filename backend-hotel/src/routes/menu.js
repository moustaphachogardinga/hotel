import express from "express";
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getMenu);
router.post("/", protect, addMenuItem);
router.put("/:id", protect, updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;
