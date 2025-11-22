import { pool } from "../db.js";
import { sendEmail } from "../utils/email.js";

// Créer une réservation (public)
export const createReservation = async (req, res) => {
  const { room_id, name, email, phone, checkin, checkout, guests, message } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO reservations (room_id, name, email, phone, checkin, checkout, guests, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')",
      [room_id, name, email, phone, checkin, checkout, guests, message]
    );

    const reservationId = result.insertId;

    const subject = " Votre réservation a été enregistrée - Hôtel la votre";
    const text = `
Bonjour ${name},

Votre demande de réservation a été enregistrée avec succès !

Numéro de réservation : RES-${reservationId}
Statut : EN ATTENTE DE VALIDATION

Notre équipe va examiner votre demande et vous enverra une confirmation officielle sous 24h.

Merci de votre confiance !

Cordialement,
Hôtel Moundoun
`;

    await sendEmail(email, subject, text);

    res.status(201).json({
      success: true,
      data: {
        id: reservationId,
        room_id,
        name,
        email,
        phone,
        checkin,
        checkout,
        guests,
        message,
        status: "pending"
      },
      message: "Réservation enregistrée en attente de validation",
    });

  } catch (err) {
    console.error("Erreur createReservation:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la création" });
  }
};

// Récupérer toutes les réservations (admin)
export const getReservations = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        r.id,
        r.room_id,
        r.name,
        r.email,
        r.phone,
        r.checkin,
        r.checkout,
        r.guests,
        r.message,
        r.status,
        r.created_at,
        ro.name AS room_name
      FROM reservations r
      LEFT JOIN rooms ro ON r.room_id = ro.id
      ORDER BY r.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("Erreur getReservations:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la récupération" });
  }
};

// Confirmer une réservation (admin)
export const confirmReservation = async (req, res) => {
  const { id } = req.params;
  const reservationId = parseInt(id, 10);

  if (isNaN(reservationId)) {
    return res.status(400).json({ success: false, message: "ID invalide" });
  }

  try {
    const [rows] = await pool.query(`
      SELECT r.*, ro.name AS room_name
      FROM reservations r
      LEFT JOIN rooms ro ON r.room_id = ro.id
      WHERE r.id = ?
    `, [reservationId]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Réservation introuvable" });
    }

    const reservation = rows[0];

    const [updateResult] = await pool.query(
      "UPDATE reservations SET status = 'confirmed' WHERE id = ?",
      [reservationId]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Réservation non mise à jour" });
    }

    const subject = " RÉSERVATION CONFIRMÉE - Hôtel la votre ";
    const text = `
Bonjour ${reservation.name},

Nous confirmons officiellement votre réservation !

 Détails :
• Numéro : RES-${reservation.id}
• Chambre : ${reservation.room_name}
• Arrivée : ${new Date(reservation.checkin).toLocaleDateString('fr-FR')}
• Départ : ${new Date(reservation.checkout).toLocaleDateString('fr-FR')}
• Nombre de personnes : ${reservation.guests}
• Prix total : ${(reservation.guests * 10000).toLocaleString('fr-FR')} FCFA

Merci de votre confiance ! Nous avons hâte de vous accueillir.

Hôtel Moundou
`;

    await sendEmail(reservation.email, subject, text);

    res.json({ 
      success: true, 
      message: "Réservation confirmée et email envoyé",
      data: { id: reservationId, status: "confirmed" }
    });

  } catch (err) {
    console.error("Erreur confirmReservation:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la confirmation" });
  }
};

// Supprimer une réservation (admin)
export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  const reservationId = parseInt(id, 10);

  if (isNaN(reservationId)) {
    return res.status(400).json({ success: false, message: "ID invalide" });
  }

  try {
    const [result] = await pool.query("DELETE FROM reservations WHERE id = ?", [reservationId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Réservation introuvable" });
    }

    res.json({ success: true, message: "Réservation supprimée avec succès" });
  } catch (err) {
    console.error("Erreur deleteReservation:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la suppression" });
  }
};