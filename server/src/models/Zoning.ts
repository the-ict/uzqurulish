import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/database';

interface IZoning {
  id: number;
  location: string;
  zoneType: 'residential' | 'commercial' | 'industrial';
  maxHeight?: number;
  maxFloors?: number;
  minGreenSpace?: number;
  restrictions?: string;
  coordinates?: number[][];
  createdAt: Date;
}

interface ZoningCreationAttributes extends Optional<IZoning, 'id' | 'createdAt'> {}

class Zoning extends Model<IZoning, ZoningCreationAttributes> implements IZoning {
  public id!: number;
  public location!: string;
  public zoneType!: 'residential' | 'commercial' | 'industrial';
  public maxHeight?: number;
  public maxFloors?: number;
  public minGreenSpace?: number;
  public restrictions?: string;
  public createdAt!: Date;
}

Zoning.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    zoneType: {
      type: DataTypes.ENUM('residential', 'commercial', 'industrial'),
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    maxFloors: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    minGreenSpace: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    restrictions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    coordinates: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Zoning',
    tableName: 'zoning_restrictions',
    timestamps: false,
  }
);

export default Zoning;