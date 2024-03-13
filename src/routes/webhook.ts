import express, { Router } from "express";
import { registerWebhook, listWebhooks } from "../controllers/webhooks";
import { body } from "express-validator";

const router: Router = express.Router();

router.post(
  "/",
  [
    body("url").isURL().withMessage("A valid URL is required"),
    body("eventType")
      .isIn(["projectCreated", "projectUpdated", "taskCreated", "taskUpdated"])
      .withMessage("A valid eventType is required"),
  ],
  registerWebhook
);

router.get("/", listWebhooks);

export default router;
