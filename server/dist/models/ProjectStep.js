"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class ProjectStep extends sequelize_1.Model {
    static associate(models) {
        ProjectStep.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    }
}
ProjectStep.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    projectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id',
        },
    },
    stepName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    stepOrder: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    completedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'ProjectStep',
    tableName: 'project_steps',
    timestamps: false,
});
exports.default = ProjectStep;
//# sourceMappingURL=ProjectStep.js.map