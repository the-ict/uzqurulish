"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportService = void 0;
const SupportTicket_1 = __importDefault(require("../models/SupportTicket"));
const FAQ_1 = __importDefault(require("../models/FAQ"));
const email_util_1 = require("../utils/email.util");
class SupportService {
    async createSupportTicket(userId, ticketData) {
        const ticket = await SupportTicket_1.default.create({
            ...ticketData,
            userId,
        });
        return ticket.toJSON();
    }
    async getUserSupportTickets(userId) {
        const tickets = await SupportTicket_1.default.findAll({
            where: { userId },
            include: [
                {
                    model: require("../models/User").default,
                    as: "user",
                    attributes: ["id", "name", "email"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        return tickets.map((ticket) => ticket.toJSON());
    }
    async getSupportTicketById(ticketId, userId) {
        const whereClause = { id: ticketId };
        if (userId) {
            whereClause.userId = userId;
        }
        const ticket = await SupportTicket_1.default.findOne({
            where: whereClause,
            include: [
                {
                    model: require("../models/User").default,
                    as: "user",
                    attributes: ["id", "name", "email"],
                },
            ],
        });
        return ticket ? ticket.toJSON() : null;
    }
    async updateSupportTicket(ticketId, updateData) {
        const ticket = await SupportTicket_1.default.findByPk(ticketId);
        if (!ticket) {
            return null;
        }
        await ticket.update(updateData);
        return ticket.toJSON();
    }
    async getAllSupportTickets() {
        const tickets = await SupportTicket_1.default.findAll({
            include: [
                {
                    model: require("../models/User").default,
                    as: "user",
                    attributes: ["id", "name", "email"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        return tickets.map((ticket) => ticket.toJSON());
    }
    async getFAQs(category) {
        const whereClause = { isActive: true };
        if (category) {
            whereClause.category = category;
        }
        const faqs = await FAQ_1.default.findAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
        });
        return faqs.map((faq) => faq.toJSON());
    }
    async getFAQById(id) {
        const faq = await FAQ_1.default.findByPk(id);
        return faq ? faq.toJSON() : null;
    }
    async createFAQ(faqData) {
        const faq = await FAQ_1.default.create(faqData);
        return faq.toJSON();
    }
    async updateFAQ(id, updateData) {
        const faq = await FAQ_1.default.findByPk(id);
        if (!faq) {
            return null;
        }
        await faq.update(updateData);
        return faq.toJSON();
    }
    async deleteFAQ(id) {
        const faq = await FAQ_1.default.findByPk(id);
        if (!faq) {
            return false;
        }
        await faq.destroy();
        return true;
    }
    async getFAQCategories() {
        const categories = await FAQ_1.default.findAll({
            attributes: ["category"],
            where: { isActive: true },
            group: ["category"],
        });
        return categories.map((cat) => cat.category);
    }
    async sendContactInfo(contactInfo) {
        try {
            const html = `
      <h2>Yangi xabar</h2>
      <p><b>Ism:</b> ${contactInfo.name}</p>
      <p><b>Email:</b> ${contactInfo.email}</p>
      <p><b>Mavzu:</b> ${contactInfo.subject}</p>
      <p><b>Xabar:</b></p>
      <p>${contactInfo.message}</p>
    `;
            await (0, email_util_1.sendEmail)("dvltinv@gmail.com", contactInfo.subject, html);
            return "Yuborildi";
        }
        catch (error) {
            console.error("Xabar yuborishda xatolik:", error);
            return "Xatolik yuz berdi";
        }
    }
}
exports.SupportService = SupportService;
//# sourceMappingURL=support.service.js.map