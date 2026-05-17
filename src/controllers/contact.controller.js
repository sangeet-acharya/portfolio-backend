import { sendContactEmail } from "../services/contact.service.js";

export const sendContact = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    await sendContactEmail({
      name,
      email,
      message,
      subject,
    });
    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
};
