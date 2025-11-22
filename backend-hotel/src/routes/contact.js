import express from "express";
import { sendContactMessage, getMessages, deleteMessage, readMessage } from "../controllers/contactController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", sendContactMessage);
router.get("/", protect, getMessages);
router.delete("/:id", protect, deleteMessage);
router.put("/:id", protect, readMessage);

export default router;
