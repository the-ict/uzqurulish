import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { ISupportTicket } from '../types/support.types';

interface SupportTicketCreationAttributes extends Optional<ISupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'priority' | 'category'> {}

class SupportTicket extends Model<ISupportTicket, SupportTicketCreationAttributes> implements ISupportTicket {
  public id!: number;
  public userId!: number;
  public subject!: string;
  public description!: string;
  public category!: 'texnik' | 'moliyaviy' | 'hisob' | 'boshqa';
  public status!: 'open' | 'in-progress' | 'resolved' | 'closed';
  public priority!: 'low' | 'medium' | 'high';
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    SupportTicket.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

SupportTicket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('texnik', 'moliyaviy', 'hisob', 'boshqa'),
      allowNull: false,
      defaultValue: 'texnik',
    },
    status: {
      type: DataTypes.ENUM('open', 'in-progress', 'resolved', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
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
  },
  {
    sequelize,
    modelName: 'SupportTicket',
    tableName: 'support_tickets',
    timestamps: true,
  }
);

export default SupportTicket;