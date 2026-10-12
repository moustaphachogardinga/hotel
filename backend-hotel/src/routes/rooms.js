// src/routes/rooms.js
import express from "express";
import {
  getRooms,
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom
} from "../controllers/roomsController.js";
import { protect } from "../middlewares/auth.js";
import { uploadRoomImage } from "../middlewares/upload.js";

const router = express.Router();

//  Empêcher TOUT CACHING par le navigateur ou un proxy
router.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// =================== ROUTES CHAMBRES ===================
router.get("/", getRooms);
router.get("/:id", getRoom);

router.post("/", protect, uploadRoomImage, (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ success: false, message: req.fileValidationError });
  }
  next();
}, addRoom);

router.put("/:id", protect, uploadRoomImage, (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ success: false, message: req.fileValidationError });
  }
  next();
}, updateRoom);

router.delete("/:id", protect, deleteRoom);

export default router;
