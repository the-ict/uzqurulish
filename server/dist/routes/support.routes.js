"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const support_controller_1 = require("../controllers/support.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const supportController = new support_controller_1.SupportController();
const createSupportTicketSchema = joi_1.default.object({
    subject: joi_1.default.string().min(5).max(255).required(),
    description: joi_1.default.string().min(10).required(),
    category: joi_1.default.string()
        .valid("texnik", "moliyaviy", "hisob", "boshqa")
        .optional(),
});
const updateSupportTicketSchema = joi_1.default.object({
    status: joi_1.default.string()
        .valid("open", "in-progress", "resolved", "closed")
        .optional(),
    priority: joi_1.default.string().valid("low", "medium", "high").optional(),
});
const createFAQSchema = joi_1.default.object({
    question: joi_1.default.string().min(5).required(),
    answer: joi_1.default.string().min(10).required(),
    category: joi_1.default.string().min(2).optional(),
});
const updateFAQSchema = joi_1.default.object({
    question: joi_1.default.string().min(5).optional(),
    answer: joi_1.default.string().min(10).optional(),
    category: joi_1.default.string().min(2).optional(),
    isActive: joi_1.default.boolean().optional(),
});
router.post("/tickets", auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(createSupportTicketSchema), supportController.createSupportTicket);
router.get("/tickets", auth_middleware_1.authenticateToken, supportController.getUserSupportTickets);
router.get("/tickets/:id", auth_middleware_1.authenticateToken, supportController.getSupportTicketById);
router.put("/tickets/:id", auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateSupportTicketSchema), supportController.updateSupportTicket);
router.get("/admin/tickets", auth_middleware_1.authenticateToken, supportController.getAllSupportTickets);
router.get("/faqs", supportController.getFAQs);
router.get("/faqs/categories", supportController.getFAQCategories);
router.get("/faqs/:id", supportController.getFAQById);
router.post("/admin/faqs", auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(createFAQSchema), supportController.createFAQ);
router.put("/admin/faqs/:id", auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateFAQSchema), supportController.updateFAQ);
router.delete("/admin/faqs/:id", auth_middleware_1.authenticateToken, supportController.deleteFAQ);
router.post("/chatbot", auth_middleware_1.authenticateToken, supportController.chatBot);
router.post("/conversations", auth_middleware_1.authenticateToken, supportController.createConversation);
router.get("/conversations/:id/messages", auth_middleware_1.authenticateToken, supportController.getConversationMessages);
router.put("/conversations/toggle", auth_middleware_1.authenticateToken, supportController.toogleConversation);
router.post("/contact", auth_middleware_1.authenticateToken, supportController.sendContactInfo);
exports.default = router;
//# sourceMappingURL=support.routes.js.map