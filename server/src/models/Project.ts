import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { IProject, INeededDocument } from "../types/project.types";

interface ProjectCreationAttributes
  extends Optional<IProject, "id" | "createdAt" | "updatedAt" | "needed_documents"> {}

class Project
  extends Model<IProject, ProjectCreationAttributes>
  implements IProject
{
  public id!: number;
  public name!: string;
  public description?: string;
  public type!: "residential" | "commercial" | "industrial";
  public area!: number;
  public location!: string;
  public status!: "pending" | "in-progress" | "approved" | "rejected";
  public progress!: number;
  public deadline?: Date;
  public userId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public needed_documents!: INeededDocument[];

  static associate(models: any) {
    Project.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Project.hasMany(models.Document, {
      foreignKey: "projectId",
      as: "documents",
    });
    Project.hasMany(models.Compliance, {
      foreignKey: "projectId",
      as: "complianceChecks",
    });
    Project.hasMany(models.ProjectStep, {
      foreignKey: "projectId",
      as: "steps",
    });
    Project.hasMany(models.Comment, {
      foreignKey: "projectId",
      as: "comments",
    });
  }
}

Project.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("residential", "commercial", "industrial"),
      allowNull: false,
    },
    area: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "approved", "rejected"),
      defaultValue: "pending",
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
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
    needed_documents: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: true,
    paranoid: true,
  }
);

export default Project;
