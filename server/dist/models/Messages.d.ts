import { Model, Optional } from "sequelize";
interface IMessages {
    id: number;
    chatId: number;
    userId: number;
    text: string;
    type: "user" | "support";
    createdAt: Date;
    updatedAt: Date;
}
interface IMessagesAttributes extends Optional<IMessages, "id" | "createdAt" | "updatedAt"> {
}
declare class Messages extends Model<IMessages, IMessagesAttributes> implements IMessages {
    id: number;
    chatId: number;
    userId: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    type: "user" | "support";
    static associate(models: any): void;
}
export default Messages;
//# sourceMappingURL=Messages.d.ts.map