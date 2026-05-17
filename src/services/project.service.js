import AppError from "../errors/AppError.js";
import * as ProjectModel from "../models/project.model.js";

//🎯 Rôle :
//👉 intermédiaire entre controller et model

// Explication :
// le service appelle le model
// il peut ajouter de la logique métier plus tard
// (filtrage, transformation, etc.)

// 👉 pour l’instant = simple passerelle

export const getAllProjects = async () => {
  return await ProjectModel.findAll();
};

export const getProjectById = async (id) => {
  //1. appel model 👉 “va chercher dans la base”
  const project = await ProjectModel.findById(id);
  //2. vérifier si ça existe 👉 si rien trouvé
  if (!project) {
    // 3. erreur propre
    // 👉 ça veut dire :
    // erreur claire
    // code 404 (comme un site introuvable)
    throw new AppError("Projet introuvable", 404);
  }
  //4. sinon on renvoie
  return project;
};

// 👉 le service transmet juste les données au model
export const createProject = async (data) => {
  const id = await ProjectModel.create(data);

  return await ProjectModel.findById(id);
};

// Ici il doit :
// 1.vérifier que le projet existe
// 2.sinon erreur 404
// 3.appeler le model

export const updateProject = async (id, data) => {
  //Vérifie si le projet existe
  const existingProject = await ProjectModel.findById(id);

  if (!existingProject) {
    throw new AppError("Projet introuvable", 404);
  }

  //Met a jour le projet
  return await ProjectModel.update(id, data);
};

export const deleteProject = async (id) => {
  //on recupere le model
  const deleted = await ProjectModel.remove(id);
  //si rien n’a été supprimé
  if (!deleted) {
    throw new AppError("Projet introuvable", 404);
  }
  return true;
};
