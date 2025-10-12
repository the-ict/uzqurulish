import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/database';
import { IUser } from '../types/user.types';

interface UserCreationAttributes extends Optional<IUser, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public company?: string;
  public role!: 'user' | 'admin';
  public subscriptionType!: 'free' | 'pro' | 'business';
  public subscriptionExpires?: Date;
  public avatarUrl?: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    User.hasMany(models.Project, { foreignKey: 'userId', as: 'projects' });
    User.hasMany(models.Document, { foreignKey: 'userId', as: 'documents' });
    User.hasMany(models.Notification, { foreignKey: 'userId', as: 'notifications' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    subscriptionType: {
      type: DataTypes.ENUM('free', 'pro', 'business'),
      defaultValue: 'free',
    },
    subscriptionExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    avatarUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
  }
);

export default User;