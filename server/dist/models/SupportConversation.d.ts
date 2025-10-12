import { Optional, Model } from "sequelize";
export interface ISupportConversation {
    id: number;
    members: number[];
    createdAt: Date;
    updatedAt: Date;
}
interface ISupportConversationAttributes extends Optional<ISupportConversation, "id" | "createdAt" | "updatedAt"> {
}
declare class SupportConversation extends Model<ISupportConversation, ISupportConversationAttributes> implements ISupportConversation {
    id: number;
    members: number[];
    createdAt: Date;
    updatedAt: Date;
    static associate(models: any): void;
}
export default SupportConversation;
//# sourceMappingURL=SupportConversation.d.ts.map