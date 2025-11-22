// src/models/Room.js
import { pool } from "../db.js";

export const Room = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM rooms");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM rooms WHERE id = ?", [id]);
    return rows[0] || null;
  },

  create: async ({ name, description, price, image, size, capacity, features, available = 1 }) => {
    const [result] = await pool.query(
      `INSERT INTO rooms (name, description, price, image, size, capacity, features, available) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, image, size, capacity, features, available]
    );

    return {
      id: result.insertId,
      name,
      description,
      price,
      image,
      size,
      capacity,
      features,
      available
    };
  },

  updateById: async (id, data) => {
    const {
      name,
      description,
      price,
      image,
      size,
      capacity,
      features,
      available
    } = data;

    const fields = [];
    const values = [];

    if (name !== undefined) { fields.push("name = ?"); values.push(name); }
    if (description !== undefined) { fields.push("description = ?"); values.push(description); }
    if (price !== undefined) { fields.push("price = ?"); values.push(price); }
    if (image !== undefined) { fields.push("image = ?"); values.push(image); }
    if (size !== undefined) { fields.push("size = ?"); values.push(size); }
    if (capacity !== undefined) { fields.push("capacity = ?"); values.push(capacity); }
    if (features !== undefined) { fields.push("features = ?"); values.push(features); }
    if (available !== undefined) { fields.push("available = ?"); values.push(available); }

    if (fields.length === 0) return 0;

    values.push(id);
    const [result] = await pool.query(
      `UPDATE rooms SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    return result.affectedRows;
  },

  deleteById: async (id) => {
    const [result] = await pool.query("DELETE FROM rooms WHERE id = ?", [id]);
    return result.affectedRows;
  }
};