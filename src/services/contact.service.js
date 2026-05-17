import { transporter } from "../config/contact.js";
// sendMail = demande au transporteur : "Envoie cet email"
export const sendContactEmail = async ({ name, message, email, subject }) => {
  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject,
    text:
      "bonjour Sangeet, voici un message de " +
      name +
      " qui te dit : " +
      message +
      ". Voici son email : " +
      email,
    // html: `
    //   <h2>Nouveau message</h2>
    //   <p><strong>Nom :</strong> ${name}</p>
    //   <p><strong>Email :</strong> ${email}</p>
    //   <p><strong>Message :</strong> ${message}</p>
    // `,
  });
};
