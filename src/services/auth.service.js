// 📦 Service (logique métier)
// -loginUser → vérifie + génère token
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as UserModel from "../models/user.model.js";
import AppError from "../errors/AppError.js";

// Mon loginUser.
// chercher user
// comparer password
// générer token
// retourner token
export const loginUser = async ({ email, password }) => {
  // 1. Chercher l'utilisateur en base
  const user = await UserModel.findByEmail(email);

  // 2. Vérifier si l'utilisateur existe
  if (!user) {
    // si il existe pas
    throw new AppError("Email ou Mot-De-Passe incorrect", 401);
  }

  // 3. Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  //si la comparaison nest pas la meme
  if (!isPasswordValid) {
    throw new AppError("Email ou Mot-De-Passe incorrect", 401);
  }

  // 4. Générer le JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );

  // 5. Retourner le token
  return token;
};
