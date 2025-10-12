"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Messages extends sequelize_1.Model {
    static associate(models) {
        Messages.belongsTo(models.SupportConversation, {
            foreignKey: "chatId",
            as: "conversation",
        });
    }
}
Messages.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    chatId: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    text: {
        type: sequelize_1.DataTypes.TEXT(),
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE(),
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE(),
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    type: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
        defaultValue: "user",
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Messages",
    tableName: "messages",
    timestamps: false,
});
exports.default = Messages;
//# sourceMappingURL=Messages.js.map