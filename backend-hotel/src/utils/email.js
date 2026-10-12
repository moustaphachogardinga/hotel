// src/utils/email.js
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE, // "gmail"
    auth: {
      user: process.env.MAIL_USER,      // ton email Gmail
      pass: process.env.MAIL_PASS,      // mot de passe d'application Gmail
    },
  });

  await transporter.sendMail({
    from: `"Hôtel la votre " <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
  });
};
