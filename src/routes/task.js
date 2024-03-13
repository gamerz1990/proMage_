"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const task_1 = require("../controllers/task");
const router = express_1.default.Router();
router.get('/', task_1.listTasks);
router.post('/', [
    (0, express_validator_1.body)('projectId').isMongoId().withMessage('Valid project ID is required'),
    (0, express_validator_1.body)('title').not().isEmpty().withMessage('Title cannot be empty'),
    (0, express_validator_1.body)('description').optional(),
    (0, express_validator_1.body)('status').isIn(['pending', 'in progress', 'completed']).withMessage('Invalid status')
], task_1.createTask);
router.put('/:id', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid task ID format'),
    (0, express_validator_1.body)('title').optional().not().isEmpty().withMessage('Title cannot be empty'),
    (0, express_validator_1.body)('description').optional(),
    (0, express_validator_1.body)('status').optional().isIn(['pending', 'in progress', 'completed']).withMessage('Invalid status')
], task_1.editTask);
exports.default = router;
