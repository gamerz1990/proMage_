"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const project_1 = require("../controllers/project");
const router = express_1.default.Router();
router.get("/", project_1.listProjects);
router.post("/", [
    (0, express_validator_1.body)("name").not().isEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("description").optional(),
    (0, express_validator_1.body)("startDate").not().isEmpty().withMessage("Start date is required"),
    (0, express_validator_1.body)("endDate").not().isEmpty().withMessage("End date is required"),
    (0, express_validator_1.body)("projectManagerId")
        .optional()
        .isMongoId()
        .withMessage("Invalid project manager ID format"),
], project_1.createProject);
router.get("/:id", [(0, express_validator_1.param)("id").isMongoId().withMessage("Invalid project ID")], project_1.getProjectDetails);
router.put("/:id", [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid project ID format"),
    (0, express_validator_1.body)("name").optional().not().isEmpty().withMessage("Name cannot be empty"),
    (0, express_validator_1.body)("description").optional(),
    (0, express_validator_1.body)("startDate")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Start date cannot be empty"),
    (0, express_validator_1.body)("endDate")
        .optional()
        .not()
        .isEmpty()
        .withMessage("End date cannot be empty"),
    (0, express_validator_1.body)("projectManagerId")
        .optional()
        .isMongoId()
        .withMessage("Invalid project manager ID format"),
], project_1.updateProject);
router.patch("/:id/assign-manager", [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid project ID format"),
    (0, express_validator_1.body)("projectManagerId")
        .not()
        .isEmpty()
        .isMongoId()
        .withMessage("Valid project manager ID is required"),
], project_1.assignProjectManager);
exports.default = router;
