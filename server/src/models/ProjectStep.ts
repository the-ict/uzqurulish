import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/database';

interface IProjectStep {
  id: number;
  projectId: number;
  stepName: string;
  stepOrder: number;
  status: 'pending' | 'in-progress' | 'completed';
  deadline?: Date;
  completedAt?: Date;
  createdAt: Date;
}

interface ProjectStepCreationAttributes extends Optional<IProjectStep, 'id' | 'createdAt'> {}

class ProjectStep extends Model<IProjectStep, ProjectStepCreationAttributes> implements IProjectStep {
  public id!: number;
  public projectId!: number;
  public stepName!: string;
  public stepOrder!: number;
  public status!: 'pending' | 'in-progress' | 'completed';
  public deadline?: Date;
  public completedAt?: Date;
  public createdAt!: Date;

  static associate(models: any) {
    ProjectStep.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
  }
}

ProjectStep.init(
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
    stepName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stepOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending',
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
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
    modelName: 'ProjectStep',
    tableName: 'project_steps',
    timestamps: false,
  }
);

export default ProjectStep;