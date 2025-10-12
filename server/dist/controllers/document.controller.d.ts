import { Request, Response } from "express";
export declare class DocumentController {
    private documentService;
    private deepseekService;
    constructor();
    createDocument: (req: Request, res: Response) => Promise<void>;
    getDocuments: (req: Request, res: Response) => Promise<void>;
    getDocument: (req: Request, res: Response) => Promise<void>;
    updateDocument: (req: Request, res: Response) => Promise<void>;
    deleteDocument: (req: Request, res: Response) => Promise<void>;
    generateDocument: (req: Request, res: Response) => Promise<void>;
    generateApplication: (req: Request, res: Response) => Promise<void>;
    changeNeededDocumentStatus: (req: Request, res: Response) => Promise<void>;
    getAllDocuments: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=document.controller.d.ts.map