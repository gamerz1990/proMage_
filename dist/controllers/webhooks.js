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
exports.listWebhooks = exports.registerWebhook = void 0;
const webhooks_1 = __importDefault(require("../models/webhooks"));
const registerWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, eventType } = req.body;
    try {
        let webhook = new webhooks_1.default({ url, eventType });
        yield webhook.save();
        res.status(201).json(webhook);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
exports.registerWebhook = registerWebhook;
const listWebhooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const webhooks = yield webhooks_1.default.find();
        res.json(webhooks);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
exports.listWebhooks = listWebhooks;
