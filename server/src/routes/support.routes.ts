import { Router } from "express";
import { SupportController } from "../controllers/support.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import Joi from "joi";

const router = Router();
const supportController = new SupportController();

const createSupportTicketSchema = Joi.object({
  subject: Joi.string().min(5).max(255).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string()
    .valid("texnik", "moliyaviy", "hisob", "boshqa")
    .optional(),
});

const updateSupportTicketSchema = Joi.object({
  status: Joi.string()
    .valid("open", "in-progress", "resolved", "closed")
    .optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
});

const createFAQSchema = Joi.object({
  question: Joi.string().min(5).required(),
  answer: Joi.string().min(10).required(),
  category: Joi.string().min(2).optional(),
});

const updateFAQSchema = Joi.object({
  question: Joi.string().min(5).optional(),
  answer: Joi.string().min(10).optional(),
  category: Joi.string().min(2).optional(),
  isActive: Joi.boolean().optional(),
});

router.post(
  "/tickets",
  authenticateToken,
  validate(createSupportTicketSchema),
  supportController.createSupportTicket
);
router.get(
  "/tickets",
  authenticateToken,
  supportController.getUserSupportTickets
);
router.get(
  "/tickets/:id",
  authenticateToken,
  supportController.getSupportTicketById
);
router.put(
  "/tickets/:id",
  authenticateToken,
  validate(updateSupportTicketSchema),
  supportController.updateSupportTicket
);

router.get(
  "/admin/tickets",
  authenticateToken,
  supportController.getAllSupportTickets
);

router.get("/faqs", supportController.getFAQs);
router.get("/faqs/categories", supportController.getFAQCategories);
router.get("/faqs/:id", supportController.getFAQById);

router.post(
  "/admin/faqs",
  authenticateToken,
  validate(createFAQSchema),
  supportController.createFAQ
);
router.put(
  "/admin/faqs/:id",
  authenticateToken,
  validate(updateFAQSchema),
  supportController.updateFAQ
);
router.delete(
  "/admin/faqs/:id",
  authenticateToken,
  supportController.deleteFAQ
);
router.post("/chatbot", authenticateToken, supportController.chatBot);

router.post(
  "/conversations",
  authenticateToken,
  supportController.createConversation
);
router.get(
  "/conversations/:id/messages",
  authenticateToken,
  supportController.getConversationMessages
);
router.put(
  "/conversations/toggle",
  authenticateToken,
  supportController.toogleConversation
);
router.post(
  "/contact",
  authenticateToken,
  supportController.sendContactInfo
);

export default router;
