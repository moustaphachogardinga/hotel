// testEmail.js
import dotenv from "dotenv";
import { sendEmail } from "./src/utils/email.js";

dotenv.config();

const testEmail = async () => {
  try {
    await sendEmail(
      "tonemaildetest@gmail.com", // Remplace par ton email réel de test
      "Test Email Hôtel Moundoun",
      "Ceci est un test pour vérifier l'envoi d'email via Nodemailer."
    );
    console.log("Email envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
};

testEmail();
