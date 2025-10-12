import { Request, Response } from 'express';
import { SupportService } from '../services/support.service';
import { ICreateSupportTicket, IUpdateSupportTicket, ICreateFAQ, IUpdateFAQ } from '../types/support.types';
import DeepSeekService from '../services/deepseek.service';
import ConversationService from '../services/conversation.service';

export class SupportController {
  private supportService: SupportService;
  private deepseekService: DeepSeekService;
  private conversationService: ConversationService;

  constructor() {
    this.supportService = new SupportService();
    this.deepseekService = new DeepSeekService;
    this.conversationService = new ConversationService();
  }


  createSupportTicket = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const ticketData: ICreateSupportTicket = req.body;

      const ticket = await this.supportService.createSupportTicket(userId, ticketData);

      res.status(201).json({
        message: 'Support ticket created successfully',
        ticket,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getUserSupportTickets = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const tickets = await this.supportService.getUserSupportTickets(userId);

      res.status(200).json({
        tickets,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getSupportTicketById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
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
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  updateSupportTicket = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData: IUpdateSupportTicket = req.body;
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
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getAllSupportTickets = async (req: Request, res: Response): Promise<void> => {
    try {
      const tickets = await this.supportService.getAllSupportTickets();

      res.status(200).json({
        tickets,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  // FAQs
  getFAQs = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category } = req.query;
      const faqs = await this.supportService.getFAQs(category as string);

      res.status(200).json({
        faqs,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getFAQById = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  createFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const faqData: ICreateFAQ = req.body;
      const faq = await this.supportService.createFAQ(faqData);

      res.status(201).json({
        message: 'FAQ created successfully',
        faq,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  updateFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData: IUpdateFAQ = req.body;
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
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  deleteFAQ = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getFAQCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.supportService.getFAQCategories();

      res.status(200).json({
        categories,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };


  chatBot = async (req: Request, res: Response): Promise<void> => {
    try {
      const { text, chatId } = req.body;
      const userId = (req as any).user.id;

      const response = await this.deepseekService.ChatBotModal({
        userId,
        question: text,
        chatId,
      });

      res.status(200).json({
        response,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  createConversation = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const conversation = await this.conversationService.createConversation({
        members: [userId, 0]
      });

      res.status(201).json({
        message: 'Conversation created successfully',
        conversation,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getConversationMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const messages = await this.conversationService.getConversationMessages({
        chatId: parseInt(id)
      });

      res.status(200).json({
        messages,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  toogleConversation = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const conversation = await this.conversationService.toogleConversation(userId);

      res.status(200).json({
        message: 'Conversation toggled successfully',
        conversation,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };


  sendContactInfo = async (req:Request, res: Response): Promise<void> => {
    try {
      await this.supportService.sendContactInfo(req.body)
      res.status(200).json({
        message: 'Contact info sent successfully',
      })
    } catch (error) {
      throw new Error("Failed to send contact info")
    }
  }
}