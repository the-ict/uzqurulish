import { Model, Optional } from 'sequelize';
import { IDocument } from '../types/document.types';
interface DocumentCreationAttributes extends Optional<IDocument, 'id' | 'createdAt' | 'updatedAt'> {
}
declare class Document extends Model<IDocument, DocumentCreationAttributes> implements IDocument {
    id: number;
    name: string;
    type: string;
    projectId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    content: string;
    status: "pending" | "in-progress" | "completed" | "rejected";
    static associate(models: any): void;
}
export default Document;
//# sourceMappingURL=Document.d.ts.map