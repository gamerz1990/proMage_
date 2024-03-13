import express, { Router } from "express";
import { body, param } from "express-validator";
import {
  createProjectManager,
  listProjectManagers,
  findProjectManagerById,
} from "../controllers/manager";

const router: Router = express.Router();

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  createProjectManager
);

router.get("/", listProjectManagers);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid project manager ID format")],
  findProjectManagerById
);

export default router;
