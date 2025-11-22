// src/models/Reservation.js
import { pool } from "../db.js";

export const ReservationModel = {
  create: async (data) => {
    return pool.query(
      `INSERT INTO reservations (room_id, name, email, phone, checkin, checkout, guests, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.room_id,
        data.name,
        data.email,
        data.phone,
        data.checkin,
        data.checkout,
        data.guests,
        data.message,
      ]
    );
  },

  findAll: async () => {
    return pool.query(`
      SELECT r.*, ro.name AS room_name
      FROM reservations r
      LEFT JOIN rooms ro ON r.room_id = ro.id
      ORDER BY r.created_at DESC
    `);
  },

  delete: async (id) => {
    return pool.query("DELETE FROM reservations WHERE id = ?", [id]);
  }
};
