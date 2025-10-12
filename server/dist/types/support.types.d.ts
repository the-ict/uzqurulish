export interface ISupportTicket {
    id: number;
    userId: number;
    subject: string;
    description: string;
    category: 'texnik' | 'moliyaviy' | 'hisob' | 'boshqa';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
}
export interface ICreateSupportTicket {
    subject: string;
    description: string;
    category?: 'texnik' | 'moliyaviy' | 'hisob' | 'boshqa';
}
export interface IUpdateSupportTicket {
    status?: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority?: 'low' | 'medium' | 'high';
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
export interface ICreateFAQ {
    question: string;
    answer: string;
    category: string;
}
export interface IUpdateFAQ {
    question?: string;
    answer?: string;
    category?: string;
    isActive?: boolean;
}
export interface ISupportMessage {
    id: number;
    ticketId: number;
    userId?: number;
    message: string;
    isFromSupport: boolean;
    createdAt: Date;
}
export interface ICreateSupportMessage {
    ticketId: number;
    message: string;
}
export interface IChatBotModalParametrs {
    userId: number;
    question: string;
    chatId: number;
}
export interface ISendContactInfo {
    name: string;
    email: string;
    subject: string;
    message: string;
}
//# sourceMappingURL=support.types.d.ts.map