import { pool } from "../db.js";

export const Contact = {
  // Créer un nouveau message
  create: async ({ name, email, phone, subject, message }) => {
    const [result] = await pool.query(
      "INSERT INTO contact (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, subject, message]
    );
    return { id: result.insertId, name, email, phone, subject, message };
  },

  // Récupérer tous les messages
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM contact");
    return rows;
  },

  // Supprimer un message par id
  deleteById: async (id) => {
    await pool.query("DELETE FROM contact WHERE id=?", [id]);
  },

  // Marquer un message comme lu
  markAsRead: async (id) => {
    await pool.query("UPDATE contact SET read_status=1 WHERE id=?", [id]);
  }
};
