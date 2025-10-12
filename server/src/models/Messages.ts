import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface IMessages {
  id: number;
  chatId: number;
  userId: number;
  text: string;
  type: "user" | "support";
  createdAt: Date;
  updatedAt: Date;
}

interface IMessagesAttributes
  extends Optional<IMessages, "id" | "createdAt" | "updatedAt"> {}

class Messages
  extends Model<IMessages, IMessagesAttributes>
  implements IMessages
{
  public id!: number;
  public chatId!: number;
  public userId!: number;
  public text!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public type!: "user" | "support";

  static associate(models: any) {
    Messages.belongsTo(models.SupportConversation, {
      foreignKey: "chatId",
      as: "conversation",
    });
  }
}

Messages.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    chatId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.STRING(),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "Messages",
    tableName: "messages",
    timestamps: false,
  }
);

export default Messages;
