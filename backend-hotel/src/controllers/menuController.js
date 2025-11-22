// src/controllers/menuController.js
import { pool } from "../db.js";

// Récupérer le menu
export const getMenu = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Ajouter un élément au menu
export const addMenuItem = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO menu (name, description, price) VALUES (?, ?, ?)",
      [name, description, price]
    );
    res.json({ success: true, data: { id: result.insertId, name, description, price } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour un élément du menu
export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    await pool.query(
      "UPDATE menu SET name=?, description=?, price=? WHERE id=?",
      [name, description, price, id]
    );
    res.json({ success: true, message: "Élément du menu mis à jour" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer un élément du menu
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM menu WHERE id=?", [id]);
    res.json({ success: true, message: "Élément du menu supprimé" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
