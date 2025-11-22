import { pool } from "../db.js";

export const Admin = {
  // Trouve un admin par email
  findByEmail: async (email) => {
    const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [email]);
    return rows[0] || null;
  }
};
