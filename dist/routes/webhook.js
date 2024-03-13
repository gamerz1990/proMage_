"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhooks_1 = require("../controllers/webhooks");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post("/", [
    (0, express_validator_1.body)("url").isURL().withMessage("A valid URL is required"),
    (0, express_validator_1.body)("eventType")
        .isIn(["projectCreated", "projectUpdated", "taskCreated", "taskUpdated"])
        .withMessage("A valid eventType is required"),
], webhooks_1.registerWebhook);
router.get("/", webhooks_1.listWebhooks);
exports.default = router;
