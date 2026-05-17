import { body } from "express-validator";

export const validateContact = [
  body("name")
    .notEmpty()
    .withMessage("le nom est requis")
    .isString()
    .withMessage("le nom doit être un texte")
    .isLength({ min: 2, max: 100 })
    .withMessage("le nom doit faire entre 2 et 100 caractères"),
  body("email")
    .notEmpty()
    .withMessage("Email obligatoire")
    .isEmail()
    .withMessage("Format email invalide"),
  body("message")
    .notEmpty()
    .withMessage("le message est requis")
    .isString()
    .withMessage("le message doit être un texte")
    .isLength({ min: 10, max: 2000 })
    .withMessage("le message doit faire entre 10 et 2000 caractères"),
  body("subject")
    .notEmpty()
    .withMessage("l'objet est requis")
    .isString()
    .withMessage("le nom doit être un texte")
    .isLength({ min: 2, max: 100 })
    .withMessage("l'objet doit faire entre 2 et 100 caractères"),
];
