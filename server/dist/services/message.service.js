"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Messages_1 = __importDefault(require("../models/Messages"));
class MessageService {
    async createMessage(params) {
        if (!params || !params.chatId || !params.text || !params.userId) {
            throw new Error("Invalid parameters: chatId, text, and userId are required.");
        }
        try {
            const message = await Messages_1.default.create(params);
            return message;
        }
        catch (error) {
            console.error("Error creating message:", error);
            throw new Error("Failed to create message. Please try again later.");
        }
    }
}
exports.default = MessageService;
//# sourceMappingURL=message.service.js.map