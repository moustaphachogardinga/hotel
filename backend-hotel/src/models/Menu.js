import { pool } from "../db.js";

export const Menu = {
  // Récupérer tous les plats
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM menu");
    return rows;
  },

  // Ajouter un plat
  create: async ({ name, price, category, image, description }) => {
    const [result] = await pool.query(
      "INSERT INTO menu (name, price, category, image, description) VALUES (?, ?, ?, ?, ?)",
      [name, price, category, image, description]
    );
    return { id: result.insertId, name, price, category, image, description };
  },

  // Mettre à jour un plat
  updateById: async (id, { name, price, category, image, description }) => {
    await pool.query(
      "UPDATE menu SET name=?, price=?, category=?, image=?, description=? WHERE id=?",
      [name, price, category, image, description, id]
    );
  },

  // Supprimer un plat
  deleteById: async (id) => {
    await pool.query("DELETE FROM menu WHERE id=?", [id]);
  }
};
