import { axiosClient } from "../configs/api";

export interface ISupportTicket {
  id: number;
  userId: number;
  subject: string;
  description: string;
  category: "texnik" | "moliyaviy" | "hisob" | "boshqa";
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ICreateSupportTicket {
  subject: string;
  description: string;
  category?: "texnik" | "moliyaviy" | "hisob" | "boshqa";
}

export interface IFAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISupportConversation {
  id: number;
  members: number[];
  createdAt: Date;
  updatedAt: Date;
}

class SupportFunc {
  public async createSupportTicket(
    ticketData: ICreateSupportTicket
  ): Promise<ISupportTicket> {
    try {
      const response = await axiosClient.post("/support/tickets", ticketData);
      return response.data.ticket;
    } catch (error) {
      throw error;
    }
  }

  public async getUserSupportTickets(): Promise<ISupportTicket[]> {
    try {
      const response = await axiosClient.get("/support/tickets");
      return response.data.tickets;
    } catch (error) {
      throw error;
    }
  }

  public async getSupportTicketById(id: number): Promise<ISupportTicket> {
    try {
      const response = await axiosClient.get(`/support/tickets/${id}`);
      return response.data.ticket;
    } catch (error) {
      throw error;
    }
  }

  public async getFAQs(category?: string): Promise<IFAQ[]> {
    try {
      const params = category ? { category } : {};
      const response = await axiosClient.get("/support/faqs", { params });
      return response.data.faqs;
    } catch (error) {
      throw error;
    }
  }

  public async getFAQCategories(): Promise<string[]> {
    try {
      const response = await axiosClient.get("/support/faqs/categories");
      return response.data.categories;
    } catch (error) {
      throw error;
    }
  }

  public async ChatBotModal(data: {
    chatId?: number;
    text: string;
  }): Promise<string> {
    try {
      const chatbotRequest = await axiosClient.post("/support/chatbot", data);

      return chatbotRequest.data.response;
    } catch (error) {
      throw error;
    }
  }

  public async createConversation(): Promise<{ id: number }> {
    try {
      const response = await axiosClient.post("/support/conversations");
      return response.data.conversation;
    } catch (error) {
      throw error;
    }
  }

  public async getConversationMessages(conversationId: number): Promise<any[]> {
    try {
      const response = await axiosClient.get(
        `/support/conversations/${conversationId}/messages`
      );
      return response.data.messages;
    } catch (error) {
      throw error;
    }
  }

  public async toggleConversation(): Promise<ISupportConversation> {
    try {
      const response = await axiosClient.put("/support/conversations/toggle");
      return response.data.conversation;
    } catch (error) {
      throw error;
    }
  }

  public async sendContactInfo({
    name,
    email,
    subject,
    message,
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      const response = await axiosClient.post("/support/contact", {
        name,
        email,
        subject,
        message,
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to send contact info client side!");
    }
  }
}

export default SupportFunc;
