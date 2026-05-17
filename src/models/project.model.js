import db from "../config/db.js";
import AppError from "../errors/AppError.js";

//🎯 Rôle :
//parler directement à la base de données

export const findAll = async () => {
  const [rows] = await db.query(
    "SELECT * FROM projects ORDER BY created_at DESC",
  );
  // résultat : rows (tableau)
  return rows;
};

export const findById = async (id) => {
  const [rows] = await db.query(
    //🔹 1. requête SQL  “donne-moi le projet avec cet id”
    "SELECT * FROM projects WHERE id = ?",
    //🔹 2. protection  empêche les injections SQL (sécurité)
    [id],
  );
  //🔹 3. résultat tableau de résultats
  return rows[0] || null;
};

export const create = async (data) => {
  //🔹 1. On récupère les données on extrait les champs
  const { title, description, tech_stack, github_url, demo_url, image_url } =
    data;

  const sql =
    "INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image_url) VALUES (?, ?, ?, ?, ?, ?)";

  //🔹 2. INSERT SQL on ajoute un projet
  const [result] = await db.execute(sql, [
    title,
    description,
    tech_stack,
    github_url,
    demo_url,
    image_url,
  ]);
  return result.insertId;
};

export const update = async (id, data) => {
  const { title, description, tech_stack, github_url, demo_url, image_url } =
    data;
  await db.query(
    `
    UPDATE projects
    SET
      title = ?,
      description = ?,
      tech_stack = ?,
      github_url = ?,
      demo_url = ?,
      image_url = ?
    WHERE id = ?
    `,
    [title, description, tech_stack, github_url, demo_url, image_url, id],
  );
  //retourne le projet mise a jour
  return await findById(id);
};

export const remove = async (id) => {
  const [result] = await db.query("DELETE FROM projects WHERE id = ?", [id]);
  // sql trouve un row : 1 = suppression reussi
  // apres avoir delete il trouve row : 0 = aucun projet trouvé
  return result.affectedRows > 0;
};
