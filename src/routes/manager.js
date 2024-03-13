"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const manager_1 = require("../controllers/manager");
const router = express_1.default.Router();
router.post("/", [
    (0, express_validator_1.body)("name").not().isEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Valid email is required"),
], manager_1.createProjectManager);
router.get("/", manager_1.listProjectManagers);
router.get("/:id", [(0, express_validator_1.param)("id").isMongoId().withMessage("Invalid project manager ID format")], manager_1.findProjectManagerById);
exports.default = router;
