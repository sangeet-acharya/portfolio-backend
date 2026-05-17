import { Router } from "express";

import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { authorize } from "../middlewares/authorize.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  validateProject,
  validateId,
} from "../validators/project.validator.js";

const router = Router();

// GET /api/projects
router.get("/", getAllProjects);
router.get("/:id", validateId, validate, getProjectById);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateProject,
  validate,
  createProject,
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateId,
  validateProject,
  validate,
  updateProject,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateId,
  validateProject,
  validate,
  deleteProject,
);
export default router;
