// src/models/Service.js
import { pool } from "../db.js";

export const ServiceModel = {
  findAll: async () => {
    return pool.query("SELECT * FROM services ORDER BY id DESC");
  },
  create: async ({ name, description }) => {
    return pool.query(
      "INSERT INTO services (name, description) VALUES (?, ?)",
      [name, description]
    );
  },
  update: async (id, { name, description }) => {
    return pool.query(
      "UPDATE services SET name=?, description=? WHERE id=?",
      [name, description, id]
    );
  },
  delete: async (id) => {
    return pool.query("DELETE FROM services WHERE id=?", [id]);
  },
};