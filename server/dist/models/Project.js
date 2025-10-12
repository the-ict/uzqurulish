"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Project extends sequelize_1.Model {
    static associate(models) {
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
Project.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("residential", "commercial", "industrial"),
        allowNull: false,
    },
    area: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "in-progress", "approved", "rejected"),
        defaultValue: "pending",
    },
    progress: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 100,
        },
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    needed_documents: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
        allowNull: false,
        defaultValue: [],
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: true,
    paranoid: true,
});
exports.default = Project;
//# sourceMappingURL=Project.js.map