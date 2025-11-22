import { Contact } from "../models/Contact.js";

// Envoyer un message contact (public)
export const sendContactMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    const newMessage = await Contact.create({ name, email, phone, subject, message });
    res.json({ success: true, data: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer tous les messages (admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll();
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer un message (admin)
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.deleteById(id);
    res.json({ success: true, message: "Message supprimé" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Marquer message comme lu (admin)
export const readMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.markAsRead(id);
    res.json({ success: true, message: "Message marqué comme lu" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
