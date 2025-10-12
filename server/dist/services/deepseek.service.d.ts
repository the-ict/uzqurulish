import { IGenerateApplicationParametrs, IGenerateDocumentParametrs, IGenerateNeededDocumentsParametrs } from "../types";
import { IChatBotModalParametrs } from "../types/support.types";
declare class DeepSeek {
    private documentService;
    private supportService;
    private messageService;
    private conversationService;
    constructor();
    generateNeededDocument(data: IGenerateDocumentParametrs): Promise<any>;
    generateNeededDocuments(data: IGenerateNeededDocumentsParametrs): Promise<any[]>;
    generateApplication(data: IGenerateApplicationParametrs): Promise<any>;
    generateDocument(data: IGenerateDocumentParametrs): Promise<any>;
    ChatBotModal(data: IChatBotModalParametrs): Promise<any>;
}
export default DeepSeek;
//# sourceMappingURL=deepseek.service.d.ts.map