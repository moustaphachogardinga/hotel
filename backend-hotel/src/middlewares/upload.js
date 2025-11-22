// src/middlewares/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const uploadRoomImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      ensureDir('public/images/rooms/');
      cb(null, 'public/images/rooms/');
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, unique + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers image sont autorisés.'));
    }
  }
}).single('image');

export const uploadServiceImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      ensureDir('public/images/services/');
      cb(null, 'public/images/services/');
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, unique + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers image sont autorisés.'));
    }
  }
}).single('image');