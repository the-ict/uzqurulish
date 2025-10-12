import { ISupportTicket, ICreateSupportTicket, IUpdateSupportTicket, IFAQ, ICreateFAQ, IUpdateFAQ, ISendContactInfo } from "../types/support.types";
export declare class SupportService {
    createSupportTicket(userId: number, ticketData: ICreateSupportTicket): Promise<ISupportTicket>;
    getUserSupportTickets(userId: number): Promise<ISupportTicket[]>;
    getSupportTicketById(ticketId: number, userId?: number): Promise<ISupportTicket | null>;
    updateSupportTicket(ticketId: number, updateData: IUpdateSupportTicket): Promise<ISupportTicket | null>;
    getAllSupportTickets(): Promise<ISupportTicket[]>;
    getFAQs(category?: string): Promise<IFAQ[]>;
    getFAQById(id: number): Promise<IFAQ | null>;
    createFAQ(faqData: ICreateFAQ): Promise<IFAQ>;
    updateFAQ(id: number, updateData: IUpdateFAQ): Promise<IFAQ | null>;
    deleteFAQ(id: number): Promise<boolean>;
    getFAQCategories(): Promise<string[]>;
    sendContactInfo(contactInfo: ISendContactInfo): Promise<string>;
}
//# sourceMappingURL=support.service.d.ts.map