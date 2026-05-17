import * as ProjectService from "../services/project.service.js";
// 🎯 Rôle :
// 👉 gérer HTTP (req / res)

// 💡 Explication :
// reçoit la requête HTTP
// appelle le service
// renvoie JSON au frontend

// 👉 Express 5 gère automatiquement les erreurs async (donc pas besoin de try/catch ici 👍)

export const getAllProjects = async (req, res) => {
  const projects = await ProjectService.getAllProjects();
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  //1. récupérer l’id
  const { id } = req.params;
  //2. appeler le service 👉 “va chercher le projet avec cet id”
  const project = await ProjectService.getProjectById(id);
  //3. envoyer la réponse
  res.json(project);
};

export const createProject = async (req, res) => {
  const { title, description, tech_stack, github_url, demo_url, image_url } =
    req.body;
  // 🔹 Appel service
  const project = await ProjectService.createProject({
    title,
    description,
    tech_stack,
    github_url,
    demo_url,
    image_url,
  });
  return res.status(201).json(project);
};

export const updateProject = async (req, res, next) => {
  // Exemple : PUT /api/projects/5
  // Express transforme ça en :
  // req.params = {
  // id: "5"
  // }
  // donc c'est egale a [const id = req.params.id]
  const { id } = req.params;
  //🔹 ProjectService.updateProject(...)
  // Tu appelles la couche service
  // Elle fait :
  // vérifie si le projet existe
  // met à jour en base de données
  // retourne le projet modifié
  const project = await ProjectService.updateProject(
    // ex id = 5
    // req.body = { "title " = "titre", "description" = "test"
    //}
    id,
    req.body,
  );
  //🔹 res.json(...)
  // envoie une réponse HTTP en JSON
  // avec tout les données
  return res.json(project);
};

// Résumé simple
// Code fait exactement ça :
// récupère l’ID dans l’URL
// récupère les nouvelles données
// demande au service de modifier le projet
// si il nexiste pas deja avec le meme id alors
// renvoie le projet modifié au frontend

export const deleteProject = async (req, res, next) => {
  const { id } = req.params;

  await ProjectService.deleteProject(id);
  //.send car il n'y a pas de body json
  // DELETE réussi sans retour	| 204	.send()
  // DELETE avec message	| 200	.json()
  return res.status(204).send();
};
