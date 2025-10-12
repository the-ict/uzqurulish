"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportController = void 0;
const support_service_1 = require("../services/support.service");
const deepseek_service_1 = __importDefault(require("../services/deepseek.service"));
const conversation_service_1 = __importDefault(require("../services/conversation.service"));
class SupportController {
    constructor() {
        this.createSupportTicket = async (req, res) => {
            try {
                const userId = req.user.id;
                const ticketData = req.body;
                const ticket = await this.supportService.createSupportTicket(userId, ticketData);
                res.status(201).json({
                    message: 'Support ticket created successfully',
                    ticket,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getUserSupportTickets = async (req, res) => {
            try {
                const userId = req.user.id;
                const tickets = await this.supportService.getUserSupportTickets(userId);
                res.status(200).json({
                    tickets,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getSupportTicketById = async (req, res) => {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const ticket = await this.supportService.getSupportTicketById(parseInt(id), userId);
                if (!ticket) {
                    res.status(404).json({
                        message: 'Support ticket not found',
                    });
                    return;
                }
                res.status(200).json({
                    ticket,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.updateSupportTicket = async (req, res) => {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const ticket = await this.supportService.updateSupportTicket(parseInt(id), updateData);
                if (!ticket) {
                    res.status(404).json({
                        message: 'Support ticket not found',
                    });
                    return;
                }
                res.status(200).json({
                    message: 'Support ticket updated successfully',
                    ticket,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getAllSupportTickets = async (req, res) => {
            try {
                const tickets = await this.supportService.getAllSupportTickets();
                res.status(200).json({
                    tickets,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        // FAQs
        this.getFAQs = async (req, res) => {
            try {
                const { category } = req.query;
                const faqs = await this.supportService.getFAQs(category);
                res.status(200).json({
                    faqs,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getFAQById = async (req, res) => {
            try {
                const { id } = req.params;
                const faq = await this.supportService.getFAQById(parseInt(id));
                if (!faq) {
                    res.status(404).json({
                        message: 'FAQ not found',
                    });
                    return;
                }
                res.status(200).json({
                    faq,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.createFAQ = async (req, res) => {
            try {
                const faqData = req.body;
                const faq = await this.supportService.createFAQ(faqData);
                res.status(201).json({
                    message: 'FAQ created successfully',
                    faq,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.updateFAQ = async (req, res) => {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const faq = await this.supportService.updateFAQ(parseInt(id), updateData);
                if (!faq) {
                    res.status(404).json({
                        message: 'FAQ not found',
                    });
                    return;
                }
                res.status(200).json({
                    message: 'FAQ updated successfully',
                    faq,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.deleteFAQ = async (req, res) => {
            try {
                const { id } = req.params;
                const deleted = await this.supportService.deleteFAQ(parseInt(id));
                if (!deleted) {
                    res.status(404).json({
                        message: 'FAQ not found',
                    });
                    return;
                }
                res.status(200).json({
                    message: 'FAQ deleted successfully',
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getFAQCategories = async (req, res) => {
            try {
                const categories = await this.supportService.getFAQCategories();
                res.status(200).json({
                    categories,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.chatBot = async (req, res) => {
            try {
                const { text, chatId } = req.body;
                const userId = req.user.id;
                const response = await this.deepseekService.ChatBotModal({
                    userId,
                    question: text,
                    chatId,
                });
                res.status(200).json({
                    response,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.createConversation = async (req, res) => {
            try {
                const userId = req.user.id;
                const conversation = await this.conversationService.createConversation({
                    members: [userId, 0]
                });
                res.status(201).json({
                    message: 'Conversation created successfully',
                    conversation,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getConversationMessages = async (req, res) => {
            try {
                const { id } = req.params;
                const messages = await this.conversationService.getConversationMessages({
                    chatId: parseInt(id)
                });
                res.status(200).json({
                    messages,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.toogleConversation = async (req, res) => {
            try {
                const userId = req.user.id;
                const conversation = await this.conversationService.toogleConversation(userId);
                res.status(200).json({
                    message: 'Conversation toggled successfully',
                    conversation,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.sendContactInfo = async (req, res) => {
            try {
                await this.supportService.sendContactInfo(req.body);
                res.status(200).json({
                    message: 'Contact info sent successfully',
                });
            }
            catch (error) {
                throw new Error("Failed to send contact info");
            }
        };
        this.supportService = new support_service_1.SupportService();
        this.deepseekService = new deepseek_service_1.default;
        this.conversationService = new conversation_service_1.default();
    }
}
exports.SupportController = SupportController;
//# sourceMappingURL=support.controller.js.map