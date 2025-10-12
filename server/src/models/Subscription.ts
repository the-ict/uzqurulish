import { sequelize } from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";

interface ISubscription {
  id: number;
  userId: number;
  order_id: string;
  amount: number;
  receipt_id: string;
  card_token?: string;
  status: "pending" | "held" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

interface SubscriptionCreationAttributes
  extends Optional<ISubscription, "id" | "createdAt" | "updatedAt" | "card_token"> {}

class Subscription
  extends Model<ISubscription, SubscriptionCreationAttributes>
  implements ISubscription
{
  public id!: number;
  public userId!: number;
  public order_id!: string;
  public amount!: number;
  public receipt_id!: string;
  public card_token?: string;
  public status!: "pending" | "held" | "confirmed" | "cancelled";
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    Subscription.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
}

Subscription.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receipt_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  card_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "held", "confirmed", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
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
  modelName: "Subscription",
  tableName: "subscriptions",
  timestamps: true,
});

export default Subscription;