import { sequelize } from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";

interface IPayment {
  userId: number;
  subs_type: "basic" | "premium";
  status: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface PaymentCreationAttributes
  extends Optional<IPayment, "id" | "createdAt" | "updatedAt"> {}

class Payment
  extends Model<IPayment, PaymentCreationAttributes>
  implements IPayment
{
  public id!: number;
  public userId!: number;
  public subs_type!: "basic" | "premium";
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    Payment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
}

Payment.init({
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
  subs_type: {
    type: DataTypes.ENUM("basic", "premium"),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
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
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
});

export default Payment;