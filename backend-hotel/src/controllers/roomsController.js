// src/controllers/roomsController.js
import { Room } from "../models/Room.js";

//  Obtenir toutes les chambres
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json({ success: true, data: rooms });
  } catch (err) {
    console.error("Erreur getRooms:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Obtenir une chambre par ID
export const getRoom = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "ID de chambre invalide" });
  }

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ success: false, message: "Chambre introuvable" });
    }
    res.json({ success: true, data: room });
  } catch (err) {
    console.error("Erreur getRoom:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Ajouter une chambre
export const addRoom = async (req, res) => {
  const { 
    name, 
    description, 
    price,
    size,
    capacity,
    features,
    available
  } = req.body;

  const imageFile = req.file;
  const imageUrl = imageFile ? `/images/rooms/${imageFile.filename}` : null;

  // Validation minimale
  if (!name || !description || price === undefined) {
    return res.status(400).json({ success: false, message: "Nom, description et prix sont requis" });
  }

  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber)) {
    return res.status(400).json({ success: false, message: "Prix invalide" });
  }

  // Convertir 'available' en 1 ou 0 (supporte string "true"/"false" ou booléen)
  const isAvailable = available === 'true' || available === true || available === '1' ? 1 : 0;

  try {
    const newRoom = await Room.create({
      name,
      description,
      price: priceNumber,
      image: imageUrl,
      size: size || null,
      capacity: capacity || null,
      features: features || null,
      available: isAvailable
    });
    res.status(201).json({ success: true, data: newRoom });
  } catch (err) {
    console.error("Erreur addRoom:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

//  Mettre à jour une chambre
export const updateRoom = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "ID de chambre invalide" });
  }

  const { 
    name, 
    description, 
    price,
    size,
    capacity,
    features,
    available
  } = req.body;

  const imageFile = req.file;
  const imageUrl = imageFile ? `/images/rooms/${imageFile.filename}` : undefined; // undefined = ne pas mettre à jour

  if (name === undefined && description === undefined && price === undefined && !imageFile) {
    return res.status(400).json({ success: false, message: "Au moins un champ à mettre à jour est requis" });
  }

  const priceNumber = price !== undefined ? parseFloat(price) : undefined;
  if (price !== undefined && isNaN(priceNumber)) {
    return res.status(400).json({ success: false, message: "Prix invalide" });
  }

  const isAvailable = 
    available !== undefined 
      ? (available === 'true' || available === true || available === '1' ? 1 : 0)
      : undefined;

  const updateData = {
    name,
    description,
    price: priceNumber,
    image: imageUrl,
    size,
    capacity,
    features,
    available: isAvailable
  };

  try {
    const affectedRows = await Room.updateById(id, updateData);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Chambre introuvable" });
    }
    res.json({ success: true, message: "Chambre mise à jour", data: { id, ...updateData } });
  } catch (err) {
    console.error("Erreur updateRoom:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

//  Supprimer une chambre
export const deleteRoom = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "ID de chambre invalide" });
  }

  try {
    const affectedRows = await Room.deleteById(id);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Chambre introuvable" });
    }
    res.json({ success: true, message: "Chambre supprimée" });
  } catch (err) {
    console.error("Erreur deleteRoom:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};