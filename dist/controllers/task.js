"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTask = exports.createTask = exports.listTasks = void 0;
const express_validator_1 = require("express-validator");
const task_1 = __importDefault(require("../models/task"));
const project_1 = __importDefault(require("../models/project"));
const webhookNotifier_1 = require("../utils/webhookNotifier");
const listTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;
    try {
        const count = yield task_1.default.countDocuments({ project: req.query.projectId });
        const tasks = yield task_1.default.find({ project: req.query.projectId })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .exec();
        res.json({ tasks, page, pages: Math.ceil(count / pageSize) });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.listTasks = listTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { projectId, title, description, status } = req.body;
    try {
        const project = yield project_1.default.findById(projectId);
        if (!project) {
            res.status(404).json({ msg: "Project not found" });
            return;
        }
        const newTask = new task_1.default({
            project: projectId,
            title,
            description,
            status,
        });
        const task = yield newTask.save();
        res.json(task);
        (0, webhookNotifier_1.notifyWebhooks)("taskCreated", task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.createTask = createTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const task = yield task_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(task);
        (0, webhookNotifier_1.notifyWebhooks)("taskUpdated", task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.editTask = editTask;
