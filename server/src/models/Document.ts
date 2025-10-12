import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/database';
import { IDocument } from '../types/document.types';

interface DocumentCreationAttributes extends Optional<IDocument, 'id' | 'createdAt' | 'updatedAt'> {}

class Document extends Model<IDocument, DocumentCreationAttributes> implements IDocument {
  public id!: number;
  public name!: string;
  public type!: string;
  public projectId!: number;
  public userId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
  public content!: string;
  public status!: "pending" | "in-progress" | "completed" | "rejected";
  
  static associate(models: any) {
    Document.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    Document.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

Document.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Document',
    tableName: 'documents',
    timestamps: true,
    paranoid: true,
  }
);

export default Document;