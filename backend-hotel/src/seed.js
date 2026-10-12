// src/seed.js
import { pool } from './db.js';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('  Réinitialisation des tables...');

    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.query('DROP TABLE IF EXISTS reservations');
    await pool.query('DROP TABLE IF EXISTS contact');
    await pool.query('DROP TABLE IF EXISTS menu');
    await pool.query('DROP TABLE IF EXISTS services');
    await pool.query('DROP TABLE IF EXISTS rooms');
    await pool.query('DROP TABLE IF EXISTS admins');
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log(' Création des tables...');

    // ---------------- ADMIN ----------------
    await pool.query(`
      CREATE TABLE admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ---------------- ROOMS (VERSION CORRIGÉE) ----------------
    await pool.query(`
      CREATE TABLE rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price INT NOT NULL,
        image VARCHAR(255),
        size VARCHAR(50),          --  au lieu de "surface"
        capacity VARCHAR(50),
        features TEXT,             --  au lieu de "equipment"
        available TINYINT(1) DEFAULT 1, -- gère la disponibilité
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ---------------- RESERVATIONS (AVEC status) ----------------
    await pool.query(`
      CREATE TABLE reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        room_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        checkin DATE,
        checkout DATE,
        guests INT,
        message TEXT,
        status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
      )
    `);

    // ---------------- SERVICES ----------------
    await pool.query(`
      CREATE TABLE services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ---------------- MENU ----------------
    await pool.query(`
      CREATE TABLE menu (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category ENUM('appetizers','mains','desserts','beverages') NOT NULL,
        price INT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ---------------- CONTACT ----------------
    await pool.query(`
      CREATE TABLE contact (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ---------------- INSERT ADMIN ----------------
    const adminPassword = process.env.ADMIN_PASSWORD || 'chogar@12';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await pool.query(
      'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)',
      ['admin', 'admin@gmail.com', hashedPassword]
    );

    // ---------------- INSERT ROOMS (VERSION CORRIGÉE) ----------------
    const rooms = [
      {
        name: 'Chambre Standard',
        description: 'Confortable, moderne, parfaite pour les courts séjours.',
        price: 45000,
        image: 'https://readdy.ai/api/search-image?query=Standard%20hotel%20room',
        size: '25 m²',
        capacity: '2 personnes',
        features: 'Climatisation, TV, Wi-Fi gratuit, Salle de bain privée'
      },
      {
        name: 'Chambre Deluxe',
        description: 'Spacieuse avec balcon, idéale pour un séjour relaxant.',
        price: 75000,
        image: 'https://readdy.ai/api/search-image?query=Deluxe%20hotel%20room',
        size: '35 m²',
        capacity: '3 personnes',
        features: 'Mini-bar, TV HD, Climatisation, Wi-Fi, Bureau, Salon'
      },
      {
        name: 'Suite Executive',
        description: 'Suite luxueuse avec salon, cuisine et prestations premium.',
        price: 120000,
        image: 'https://readdy.ai/api/search-image?query=Executive%20hotel%20suite',
        size: '55 m²',
        capacity: '4 personnes',
        features: 'Cuisine équipée, Salon, TV 4K, Machine à café, Jacuzzi'
      }
    ];

    for (const room of rooms) {
      await pool.query(
        `INSERT INTO rooms (name, description, price, image, size, capacity, features, available)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [room.name, room.description, room.price, room.image, room.size, room.capacity, room.features, 1]
      );
    }

    // ---------------- INSERT SERVICES ----------------
    const services = [
      { name: 'Restaurant & Bar', description: 'Cuisine raffinée et bar élégant' },
      { name: 'Piscine & Spa', description: 'Détente dans notre spa moderne' },
      { name: 'Transport & Navette', description: 'Service de transport confortable' }
    ];

    for (const service of services) {
      await pool.query(
        'INSERT INTO services (name, description) VALUES (?, ?)',
        [service.name, service.description]
      );
    }

    // ---------------- INSERT MENU ----------------
    const menuItems = [
      { name: 'Salade de Crevettes Tropicales', category: 'appetizers', price: 8500, description: 'Crevettes grillées, mangue, avocat, vinaigrette passion' },
      { name: 'Poulet Yassa', category: 'mains', price: 12000, description: 'Poulet mariné aux oignons, riz parfumé, légumes de saison' },
      { name: 'Tarte à la Mangue', category: 'desserts', price: 4200, description: 'Pâte sablée, crème pâtissière, mangue fraîche' },
      { name: 'Jus de Fruits Frais', category: 'beverages', price: 2500, description: 'Orange, mangue, ananas, passion - au choix' }
    ];

    for (const item of menuItems) {
      await pool.query(
        'INSERT INTO menu (name, category, price, description) VALUES (?, ?, ?, ?)',
        [item.name, item.category, item.price, item.description]
      );
    }

    console.log('Base de données réinitialisée et données insérées avec succès !');
    console.log(' Identifiants admin : admin / chogar@12');
    process.exit(0);

  } catch (err) {
    console.error('Erreur lors du seed :', err);
    process.exit(1);
  }
}

seed();