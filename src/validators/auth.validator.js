import { body } from "express-validator";

//Pourquoi un tableau ?
//Parce qu’on peut mettre plusieurs règles de validation dedans.
export const validateAuth = [
  //👉 cible le champ email
  body("email")
    //Vérifier que le champ existe
    //Message d’erreur personnalisé
    .notEmpty()
    .withMessage("Email obligatoire")
    //Vérifier le format email
    .isEmail()
    //Message si mauvais format
    .withMessage("Format email invalide"),
  body("password").notEmpty().withMessage("mot de passe obligatoire"),
];
