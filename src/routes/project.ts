import express, { Router } from "express";
import { body, param } from "express-validator";
import {
  listProjects,
  createProject,
  getProjectDetails,
  updateProject,
  assignProjectManager,
} from "../controllers/project";

const router: Router = express.Router();

router.get("/", listProjects);

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("description").optional(),
    body("startDate").not().isEmpty().withMessage("Start date is required"),
    body("endDate").not().isEmpty().withMessage("End date is required"),
    body("projectManagerId")
      .optional()
      .isMongoId()
      .withMessage("Invalid project manager ID format"),
  ],
  createProject
);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid project ID")],
  getProjectDetails
);

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid project ID format"),
    body("name").optional().not().isEmpty().withMessage("Name cannot be empty"),
    body("description").optional(),
    body("startDate")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Start date cannot be empty"),
    body("endDate")
      .optional()
      .not()
      .isEmpty()
      .withMessage("End date cannot be empty"),
    body("projectManagerId")
      .optional()
      .isMongoId()
      .withMessage("Invalid project manager ID format"),
  ],
  updateProject
);

router.patch(
  "/:id/assign-manager",
  [
    param("id").isMongoId().withMessage("Invalid project ID format"),
    body("projectManagerId")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("Valid project manager ID is required"),
  ],
  assignProjectManager
);

export default router;
