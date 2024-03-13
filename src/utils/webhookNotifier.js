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
exports.notifyWebhooks = void 0;
const axios_1 = __importDefault(require("axios"));
const webhooks_1 = __importDefault(require("../models/webhooks"));
const notifyWebhooks = (eventType, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const webhooks = yield webhooks_1.default.find({ eventType });
        webhooks.forEach(webhook => {
            axios_1.default.post(webhook.url, data)
                .then(response => console.log(`Webhook sent to ${webhook.url} with status: ${response.status}`))
                .catch(error => console.error(`Error sending webhook to ${webhook.url}: ${error}`));
        });
    }
    catch (error) {
        console.error(`Error notifying webhooks for event ${eventType}: ${error}`);
    }
});
exports.notifyWebhooks = notifyWebhooks;
