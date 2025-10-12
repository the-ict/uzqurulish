"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Compliance extends sequelize_1.Model {
    static associate(models) {
        Compliance.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    }
}
Compliance.init({
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
    ruleName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'passed', 'failed', "warning"),
        defaultValue: 'pending',
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 100,
        },
    },
    details: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Compliance',
    tableName: 'compliance_checks',
    timestamps: false,
});
exports.default = Compliance;
//# sourceMappingURL=Complience.js.map