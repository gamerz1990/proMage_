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
exports.findProjectManagerById = exports.listProjectManagers = exports.createProjectManager = void 0;
const express_validator_1 = require("express-validator");
const managers_1 = __importDefault(require("../models/managers"));
const createProjectManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { name, email } = req.body;
        let projectManager = new managers_1.default({ name, email });
        yield projectManager.save();
        res.json(projectManager);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.createProjectManager = createProjectManager;
const listProjectManagers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectManagers = yield managers_1.default.find();
        res.json(projectManagers);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.listProjectManagers = listProjectManagers;
const findProjectManagerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const projectManager = yield managers_1.default.findById(req.params.id);
        if (!projectManager) {
            res.status(404).json({ msg: "Project Manager not found" });
            return;
        }
        res.json(projectManager);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.findProjectManagerById = findProjectManagerById;
