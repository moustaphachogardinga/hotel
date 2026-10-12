// src/routes/reservations.js
import express from "express";
import { 
  createReservation, 
  getReservations, 
  deleteReservation,
  confirmReservation // Nouvelle importation
} from "../controllers/reservationsController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", protect, getReservations);
router.delete("/:id", protect, deleteReservation);
// Nouvelle route
router.patch("/:id/confirm", protect, confirmReservation);

export default router;