import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/database';

interface INotification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: Date;
}

interface NotificationCreationAttributes extends Optional<INotification, 'id' | 'createdAt'> {}

class Notification extends Model<INotification, NotificationCreationAttributes> implements INotification {
  public id!: number;
  public userId!: number;
  public title!: string;
  public message!: string;
  public type!: 'info' | 'warning' | 'error' | 'success';
  public read!: boolean;
  public createdAt!: Date;

  static associate(models: any) {
    Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

Notification.init(
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('info', 'warning', 'error', 'success'),
      defaultValue: 'info',
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: false,
  }
);

export default Notification;