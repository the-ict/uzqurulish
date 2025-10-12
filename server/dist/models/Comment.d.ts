import { Model, Optional } from "sequelize";
interface IComment {
    id: number;
    projectId: number;
    userId: number;
    content: string;
    createdAt: Date;
}
interface CommentCreationAttributes extends Optional<IComment, "id" | "createdAt"> {
}
declare class Comment extends Model<IComment, CommentCreationAttributes> implements IComment {
    id: number;
    projectId: number;
    userId: number;
    content: string;
    createdAt: Date;
    static associate(models: any): void;
}
export default Comment;
//# sourceMappingURL=Comment.d.ts.map