import { IGenerateApplicationParametrs, IGenerateDocumentParametrs, IGenerateNeededDocumentsParametrs } from "../types";
export declare const generateApplicationPrompt: (data: IGenerateApplicationParametrs) => string;
export declare const generateNeededDocuments: (data: IGenerateNeededDocumentsParametrs) => string;
export declare const generateDocumentPrompt: (data: IGenerateDocumentParametrs) => string;
export declare const generateChatBotModalPrompt: (data: {
    question: string;
}) => string;
//# sourceMappingURL=propmts.d.ts.map