import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

import adminRoutes from "./routes/admin.js";
import roomRoutes from "./routes/rooms.js";
import reservationRoutes from "./routes/reservations.js";
import contactRoutes from "./routes/contact.js";
import servicesRoutes from "./routes/services.js";
import menuRoutes from "./routes/menu.js";

dotenv.config();

const app = express();

// === MIDDLEWARES ===
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Ajoutez cette ligne
app.use("/images", express.static("public/images"));

// === ROUTES ===
app.get("/", (req, res) => res.send("🚀 API Hôtel Moundoun fonctionne !"));

app.use("/api/admin", adminRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/menu", menuRoutes);

// === GESTION DES ERREURS ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Erreur serveur" });
});

// === LANCEMENT DU SERVEUR ===
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    await pool.query("SELECT 1");
    console.log(` Base de données connectée`);
    console.log(` Serveur en écoute sur http://localhost:${PORT}`);
  } catch (error) {
    console.error(" Erreur de connexion MySQL :", error.message);
  }
});