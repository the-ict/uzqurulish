"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
class ConversationService {
    async createConversation(data) {
        // Input validation
        if (!data.members || !Array.isArray(data.members) || data.members.length === 0) {
            throw new Error("Members array is required and cannot be empty.");
        }
        try {
            const conversation = await models_1.default.SupportConversation.create(data);
            return conversation.toJSON();
        }
        catch (error) {
            console.error("Error creating conversation:", error);
            throw new Error("Failed to create conversation. Please try again.");
        }
    }
    async getConversationMessages({ chatId }) {
        if (!chatId || typeof chatId !== "number" || chatId <= 0) {
            throw new Error("Valid chatId is required.");
        }
        try {
            const conversation = await models_1.default.SupportConversation.findByPk(chatId);
            if (!conversation) {
                throw new Error("Conversation not found.");
            }
            const messages = await models_1.default.Messages.findAll({
                where: {
                    chatId: chatId,
                },
                order: [["createdAt", "ASC"]],
            });
            return messages.map(msg => msg.toJSON());
        }
        catch (error) {
            console.error("Error retrieving conversation messages:", error);
            throw new Error("Failed to retrieve conversation messages. Please try again.");
        }
    }
    async toogleConversation(userId) {
        try {
            // Find existing conversation for user
            const existingConversation = await models_1.default.SupportConversation.findOne({
                where: {
                    members: {
                        [sequelize_1.Op.contains]: [userId]
                    }
                }
            });
            if (existingConversation) {
                return existingConversation.toJSON();
            }
            else {
                // Create new conversation
                const conversation = await this.createConversation({
                    members: [userId, 0]
                });
                return conversation;
            }
        }
        catch (error) {
            console.error("Error toggling conversation:", error);
            throw new Error("Failed to toggle conversation. Please try again.");
        }
    }
}
exports.default = ConversationService;
//# sourceMappingURL=conversation.service.js.map