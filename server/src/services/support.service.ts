import SupportTicket from "../models/SupportTicket";
import FAQ from "../models/FAQ";
import {
  ISupportTicket,
  ICreateSupportTicket,
  IUpdateSupportTicket,
  IFAQ,
  ICreateFAQ,
  IUpdateFAQ,
  ISendContactInfo,
} from "../types/support.types";
import { sendEmail } from "../utils/email.util";

export class SupportService {
  async createSupportTicket(
    userId: number,
    ticketData: ICreateSupportTicket
  ): Promise<ISupportTicket> {
    const ticket = await SupportTicket.create({
      ...ticketData,
      userId,
    });
    return ticket.toJSON();
  }

  async getUserSupportTickets(userId: number): Promise<ISupportTicket[]> {
    const tickets = await SupportTicket.findAll({
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

  async getSupportTicketById(
    ticketId: number,
    userId?: number
  ): Promise<ISupportTicket | null> {
    const whereClause: any = { id: ticketId };
    if (userId) {
      whereClause.userId = userId;
    }

    const ticket = await SupportTicket.findOne({
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

  async updateSupportTicket(
    ticketId: number,
    updateData: IUpdateSupportTicket
  ): Promise<ISupportTicket | null> {
    const ticket = await SupportTicket.findByPk(ticketId);
    if (!ticket) {
      return null;
    }

    await ticket.update(updateData);
    return ticket.toJSON();
  }

  async getAllSupportTickets(): Promise<ISupportTicket[]> {
    const tickets = await SupportTicket.findAll({
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

  async getFAQs(category?: string): Promise<IFAQ[]> {
    const whereClause: any = { isActive: true };
    if (category) {
      whereClause.category = category;
    }

    const faqs = await FAQ.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });
    return faqs.map((faq) => faq.toJSON());
  }

  async getFAQById(id: number): Promise<IFAQ | null> {
    const faq = await FAQ.findByPk(id);
    return faq ? faq.toJSON() : null;
  }

  async createFAQ(faqData: ICreateFAQ): Promise<IFAQ> {
    const faq = await FAQ.create(faqData);
    return faq.toJSON();
  }

  async updateFAQ(id: number, updateData: IUpdateFAQ): Promise<IFAQ | null> {
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return null;
    }

    await faq.update(updateData);
    return faq.toJSON();
  }

  async deleteFAQ(id: number): Promise<boolean> {
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return false;
    }

    await faq.destroy();
    return true;
  }

  async getFAQCategories(): Promise<string[]> {
    const categories = await FAQ.findAll({
      attributes: ["category"],
      where: { isActive: true },
      group: ["category"],
    });

    return categories.map((cat) => cat.category);
  }

  async sendContactInfo(contactInfo: ISendContactInfo): Promise<string> {
    try {
      const html = `
      <h2>Yangi xabar</h2>
      <p><b>Ism:</b> ${contactInfo.name}</p>
      <p><b>Email:</b> ${contactInfo.email}</p>
      <p><b>Mavzu:</b> ${contactInfo.subject}</p>
      <p><b>Xabar:</b></p>
      <p>${contactInfo.message}</p>
    `;

      await sendEmail("dvltinv@gmail.com", contactInfo.subject, html);
      return "Yuborildi";
    } catch (error) {
      console.error("Xabar yuborishda xatolik:", error);
      return "Xatolik yuz berdi";
    }
  }
}
