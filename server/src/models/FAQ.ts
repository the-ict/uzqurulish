import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { IFAQ } from '../types/support.types';

interface FAQCreationAttributes extends Optional<IFAQ, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'category'> {}

class FAQ extends Model<IFAQ, FAQCreationAttributes> implements IFAQ {
  public id!: number;
  public question!: string;
  public answer!: string;
  public category!: string;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

FAQ.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'umumiy',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    modelName: 'FAQ',
    tableName: 'faqs',
    timestamps: true,
  }
);

export default FAQ;