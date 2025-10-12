import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface IComment {
  id: number;
  projectId: number;
  userId: number;
  content: string;
  createdAt: Date;
}

interface CommentCreationAttributes
  extends Optional<IComment, "id" | "createdAt"> {}

class Comment
  extends Model<IComment, CommentCreationAttributes>
  implements IComment
{
  public id!: number;
  public projectId!: number;
  public userId!: number;
  public content!: string;
  public createdAt!: Date;

  static associate(models: any) {
    Comment.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
    });
    Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
  }
);

export default Comment;
