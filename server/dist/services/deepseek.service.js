"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_config_1 = __importDefault(require("../config/axios.config"));
const propmts_1 = require("../constants/propmts");
const document_service_1 = require("./document.service");
const support_service_1 = require("./support.service");
const message_service_1 = __importDefault(require("./message.service"));
const conversation_service_1 = __importDefault(require("./conversation.service"));
class DeepSeek {
    constructor() {
        this.documentService = new document_service_1.DocumentService();
        this.supportService = new support_service_1.SupportService();
        this.messageService = new message_service_1.default();
        this.conversationService = new conversation_service_1.default();
    }
    async generateNeededDocument(data) {
        const prompt = (0, propmts_1.generateDocumentPrompt)({
            name: data.name,
            additionalInfo: data.additionalInfo,
            type: data.type,
            field: data.field,
            userId: data.userId,
        });
        try {
            const response = await axios_config_1.default.post("/chat/completions", {
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }],
            });
            return response.data.choices[0].message.content;
        }
        catch (error) {
            throw new Error("Failed to generate document");
        }
    }
    async generateNeededDocuments(data) {
        const prompt = (0, propmts_1.generateNeededDocuments)(data);
        try {
            const response = await axios_config_1.default.post("/chat/completions", {
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }],
            });
            const content = response.data.choices[0].message.content;
            const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
            const jsonString = jsonMatch ? jsonMatch[1] : content;
            const parsedDocuments = JSON.parse(jsonString);
            const documentsWithTimestamps = Array.isArray(parsedDocuments)
                ? parsedDocuments.map((doc) => ({
                    ...doc,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }))
                : [];
            return documentsWithTimestamps;
        }
        catch (error) {
            throw new Error("Failed to generate needed documents");
        }
    }
    async generateApplication(data) {
        const prompt = (0, propmts_1.generateApplicationPrompt)(data);
        try {
            const response = await axios_config_1.default.post("/chat/completions", {
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }],
            });
            const content = response.data.choices[0].message.content;
            if (content) {
                const document = await this.documentService.createDocument(data.name, data.projectId, content, "application", data.userId);
                if (document)
                    return content;
                else {
                    console.log("Failed to create document");
                    throw new Error("Failed to create document");
                }
            }
        }
        catch (error) {
            console.log(error, "this is the error");
            throw new Error("Failed to generate application");
        }
    }
    async generateDocument(data) {
        const prompt = (0, propmts_1.generateDocumentPrompt)(data);
        try {
            const response = await axios_config_1.default.post("/chat/completions", {
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }],
            });
            const content = response.data.choices[0].message.content;
            if (content) {
                const document = await this.documentService.createDocument(data.name, data.field, content, "document", data.userId);
                if (document)
                    return content;
                else {
                    console.log("Failed to create document");
                    throw new Error("Failed to create document");
                }
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async ChatBotModal(data) {
        console.log(data, "data");
        const prompt = (0, propmts_1.generateChatBotModalPrompt)({ question: data.question });
        try {
            await this.messageService.createMessage({
                chatId: data.chatId,
                text: data.question,
                userId: data.userId,
                type: "user"
            });
            const response = await axios_config_1.default.post("/chat/completions", {
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }],
            });
            if (response.data.choices[0].message.content) {
                await this.messageService.createMessage({
                    chatId: data.chatId,
                    text: response.data.choices[0].message.content,
                    userId: data.userId,
                    type: "support"
                });
            }
            return response.data.choices[0].message.content;
        }
        catch (error) {
            console.log(error, "error");
            throw new Error("Failed to generate chatbot response");
        }
    }
}
exports.default = DeepSeek;
//# sourceMappingURL=deepseek.service.js.map