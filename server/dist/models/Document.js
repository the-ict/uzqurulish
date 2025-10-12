"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Document extends sequelize_1.Model {
    static associate(models) {
        Document.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
        Document.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
}
Document.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    projectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id',
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
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
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'in-progress', 'completed', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Document',
    tableName: 'documents',
    timestamps: true,
    paranoid: true,
});
exports.default = Document;
//# sourceMappingURL=Document.js.map