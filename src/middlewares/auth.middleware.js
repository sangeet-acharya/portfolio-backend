// 🔐 authenticate
// Vérifie :
// "Es-tu connecté ?"
// 👉 grâce au token JWT

//Parce que JWT fournit : (jwt.verify()).
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

//creation de middleware
export const authenticate = (req, res, next) => {
  //lire le header Autorization
  //authHeader contient : Bearer eyJjshKsioi......
  const authHeader = req.headers.authorization;
  //Vérifier que le header existe || Vérifier le format Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //401 = si tu n'es pas authentifié
    return next(new AppError("Token manquant", 401));
  }
  //extraire le token jai Bearer kjdnqsnd...
  // je le split en [Bearer, akdjnazkn]
  // et je prend le index 1
  const token = authHeader.split(" ")[1];

  //je verifie le token
  // signature valide
  // token non modifié
  // token non expiré
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //Stocker le payload dans req.user
    req.user = payload;
    //middleware suivant
    next();
  } catch {
    next(new AppError("Token invalide", 401));
  }
};
