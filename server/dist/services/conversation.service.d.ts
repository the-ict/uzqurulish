import type { ICreateConversationParams } from "../types/conversation.types";
import type { ISupportConversation } from "../models/SupportConversation";
declare class ConversationService {
    createConversation(data: ICreateConversationParams): Promise<ISupportConversation>;
    getConversationMessages({ chatId }: {
        chatId: number;
    }): Promise<any[]>;
    toogleConversation(userId: number): Promise<ISupportConversation>;
}
export default ConversationService;
//# sourceMappingURL=conversation.service.d.ts.map