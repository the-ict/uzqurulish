import { INeededDocument } from "../types";
import { IChangeNeededDocumentParams, IDocument } from "../types/document.types";
export declare class DocumentService {
    private fileService;
    private ProjectService;
    constructor();
    createDocument(name: string, projectId: number, content: string, type: string, userId: number): Promise<IDocument>;
    getDocumentsByProjectId(projectId: number): Promise<IDocument[]>;
    getDocumentById(id: number): Promise<IDocument>;
    updateDocument(id: number, userId: number, updateData: Partial<IDocument>): Promise<IDocument>;
    deleteDocument(id: number, userId: number): Promise<void>;
    changeNeededDocumentStatus({ projectId, neededDocumentId, status, }: IChangeNeededDocumentParams): Promise<import("../types").IProject>;
    getAllDocuments(id: number): Promise<INeededDocument[]>;
}
//# sourceMappingURL=document.service.d.ts.map