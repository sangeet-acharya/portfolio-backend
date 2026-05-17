// 🛡️ authorize
// Vérifie :
// "As-tu le droit de faire cette action ?"
// 👉 grâce au rôle utilisateur
import AppError from "../errors/AppError.js";

//(role) reçoit le rôle autorisé
export const authorize =
  (allowedRole) =>
  //(req, res, next) est le vrai middleware Express
  (req, res, next) => {
    // je verifie req.user.role = allowedRole
    // si différent aboslue je envoi un message
    if (!(allowedRole === req.user.role)) {
      //pourquoi 403 et pas 403 car
      // 401 = "tu n'es pas connecté"
      // 403 = "Tu es connecté Mais Interdit Pour ton role"
      return next(new AppError("Action non autorisée", 403));
    }
    next();
  };
