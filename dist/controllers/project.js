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
exports.assignProjectManager = exports.updateProject = exports.getProjectDetails = exports.createProject = exports.listProjects = void 0;
const express_validator_1 = require("express-validator");
const project_1 = __importDefault(require("../models/project"));
const managers_1 = __importDefault(require("../models/managers"));
const webhookNotifier_1 = require("../utils/webhookNotifier");
const listProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;
    let query = {};
    if (req.query.current === "true") {
        query.endDate = { $gte: new Date() };
    }
    try {
        const count = yield project_1.default.countDocuments(query);
        const projects = yield project_1.default.find(query)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate("projectManager")
            .exec();
        res.json({ projects, page, pages: Math.ceil(count / pageSize) });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.listProjects = listProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { name, description, startDate, endDate, projectManagerId } = req.body;
    try {
        if (projectManagerId) {
            const projectManager = yield managers_1.default.findById(projectManagerId);
            if (!projectManager) {
                res.status(404).json({ msg: "Project Manager not found" });
                return;
            }
        }
        const project = new project_1.default({
            name,
            description,
            startDate,
            endDate,
            projectManager: projectManagerId,
        });
        yield project.save();
        res.json(project);
        (0, webhookNotifier_1.notifyWebhooks)("projectCreated", project);
    }
    catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.createProject = createProject;
const getProjectDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const project = yield project_1.default.findById(req.params.id).populate("projectManager");
        if (!project) {
            res.status(404).json({ msg: "Project not found" });
            return;
        }
        res.json({ project });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.getProjectDetails = getProjectDetails;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { name, description, startDate, endDate, projectManagerId } = req.body;
    try {
        const projectFields = { name, description, startDate, endDate };
        if (projectManagerId) {
            const projectManager = yield managers_1.default.findById(projectManagerId);
            if (!projectManager) {
                res.status(404).json({ msg: "Project Manager not found" });
                return;
            }
            projectFields.projectManager = projectManagerId;
        }
        let project = yield project_1.default.findById(req.params.id);
        if (!project) {
            res.status(404).json({ msg: "Project not found" });
            return;
        }
        project = yield project_1.default.findByIdAndUpdate(req.params.id, { $set: projectFields }, { new: true }).populate("projectManager");
        (0, webhookNotifier_1.notifyWebhooks)("projectUpdated", project);
        res.json(project);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.updateProject = updateProject;
const assignProjectManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { projectManagerId } = req.body;
    try {
        const projectManager = yield managers_1.default.findById(projectManagerId);
        if (!projectManager) {
            res.status(404).json({ msg: "Project Manager not found" });
            return;
        }
        const project = yield project_1.default.findById(req.params.id);
        if (!project) {
            res.status(404).json({ msg: "Project not found" });
            return;
        }
        project.projectManager = projectManagerId;
        yield project.save();
        res.json(project);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.assignProjectManager = assignProjectManager;
