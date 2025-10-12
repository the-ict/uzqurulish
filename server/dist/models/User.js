"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasMany(models.Project, { foreignKey: 'userId', as: 'projects' });
        User.hasMany(models.Document, { foreignKey: 'userId', as: 'documents' });
        User.hasMany(models.Notification, { foreignKey: 'userId', as: 'notifications' });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        field: "password_hash"
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    company: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
    subscriptionType: {
        type: sequelize_1.DataTypes.ENUM('free', 'pro', 'business'),
        defaultValue: 'free',
    },
    subscriptionExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
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
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
});
exports.default = User;
//# sourceMappingURL=User.js.map