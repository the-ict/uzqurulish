import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export interface ISupportConversation {
  id: number;
  members: number[];
  createdAt: Date;
  updatedAt: Date;
}

interface ISupportConversationAttributes
  extends Optional<ISupportConversation, "id" | "createdAt" | "updatedAt"> {}

class SupportConversation
  extends Model<ISupportConversation, ISupportConversationAttributes>
  implements ISupportConversation
{
  public id!: number;
  public members!: number[];
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    SupportConversation.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

SupportConversation.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  members: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
    sequelize,
    modelName: "SupportConversation",
    tableName: "support_conversations",
    timestamps: false,
});

export default SupportConversation