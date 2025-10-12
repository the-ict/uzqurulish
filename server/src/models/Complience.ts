import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/database';

interface ICompliance {
  id: number;
  projectId: number;
  ruleName: string;
  status: 'pending' | 'passed' | 'failed' | 'warning';
  score: number;
  details?: string;
  createdAt: Date;
}

interface ComplianceCreationAttributes extends Optional<ICompliance, 'id' | 'createdAt'> {}

class Compliance extends Model<ICompliance, ComplianceCreationAttributes> implements ICompliance {
  public id!: number;
  public projectId!: number;
  public ruleName!: string;
  public status!: 'pending' | 'passed' | 'failed' | "warning";
  public score!: number;
  public details?: string;
  public createdAt!: Date;

  static associate(models: any) {
    Compliance.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
  }
}

Compliance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    ruleName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'passed', 'failed', "warning"),
      defaultValue: 'pending',
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    details: {
      type: DataTypes.TEXT,
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
    modelName: 'Compliance',
    tableName: 'compliance_checks',
    timestamps: false,
  }
);

export default Compliance;