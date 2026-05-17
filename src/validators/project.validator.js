import { body, param } from "express-validator";

export const validateId = [
  param("id").isInt({ min: 1 }).withMessage("id format incorrecte"),
];

export const validateProject = [
  body("title")
    .notEmpty()
    .withMessage("Le titre est requis")
    .isString()
    .withMessage("le titre doit être un texte")
    .isLength({ min: 2, max: 150 })
    .withMessage("le titre doit faire entre 2 et 150 caractères"),

  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("la description doit être un texte")
    .isLength({ max: 2000 })
    .withMessage("Maximum 2000 caractères"),

  body("tech_stack")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("le tech stack doit être un texte")
    .isLength({ max: 255 })
    .withMessage("Maximum 255 caractères"),

  body("github_url")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("URL GitHub invalide"),

  body("demo_url")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("URL de démo invalide"),

  body("image_url")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("URL de l'image invalide"),
];
