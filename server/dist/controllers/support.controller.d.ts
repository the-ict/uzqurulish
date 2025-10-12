import { Request, Response } from 'express';
export declare class SupportController {
    private supportService;
    private deepseekService;
    private conversationService;
    constructor();
    createSupportTicket: (req: Request, res: Response) => Promise<void>;
    getUserSupportTickets: (req: Request, res: Response) => Promise<void>;
    getSupportTicketById: (req: Request, res: Response) => Promise<void>;
    updateSupportTicket: (req: Request, res: Response) => Promise<void>;
    getAllSupportTickets: (req: Request, res: Response) => Promise<void>;
    getFAQs: (req: Request, res: Response) => Promise<void>;
    getFAQById: (req: Request, res: Response) => Promise<void>;
    createFAQ: (req: Request, res: Response) => Promise<void>;
    updateFAQ: (req: Request, res: Response) => Promise<void>;
    deleteFAQ: (req: Request, res: Response) => Promise<void>;
    getFAQCategories: (req: Request, res: Response) => Promise<void>;
    chatBot: (req: Request, res: Response) => Promise<void>;
    createConversation: (req: Request, res: Response) => Promise<void>;
    getConversationMessages: (req: Request, res: Response) => Promise<void>;
    toogleConversation: (req: Request, res: Response) => Promise<void>;
    sendContactInfo: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=support.controller.d.ts.map