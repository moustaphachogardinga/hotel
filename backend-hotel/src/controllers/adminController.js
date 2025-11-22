import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifie que l'email correspond exactement à admin@gmail.com
    if (email !== "admin@gmail.com") {
      return res.status(401).json({ success: false, message: "Admin introuvable" });
    }

    // Recherche l'admin via le modèle
    const admin = await Admin.findByEmail(email);

    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin introuvable" });
    }

    // Vérifie le mot de passe avec bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Mot de passe incorrect" });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.json({
      success: true,
      token,
      admin: { username: admin.username, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
