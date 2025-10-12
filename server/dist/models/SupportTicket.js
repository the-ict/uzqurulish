"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class SupportTicket extends sequelize_1.Model {
    static associate(models) {
        SupportTicket.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
}
SupportTicket.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    subject: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.ENUM('texnik', 'moliyaviy', 'hisob', 'boshqa'),
        allowNull: false,
        defaultValue: 'texnik',
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('open', 'in-progress', 'resolved', 'closed'),
        allowNull: false,
        defaultValue: 'open',
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
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
}, {
    sequelize: database_1.sequelize,
    modelName: 'SupportTicket',
    tableName: 'support_tickets',
    timestamps: true,
});
exports.default = SupportTicket;
//# sourceMappingURL=SupportTicket.js.map