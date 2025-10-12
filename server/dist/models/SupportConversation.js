"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class SupportConversation extends sequelize_1.Model {
    static associate(models) {
        SupportConversation.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    }
}
SupportConversation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    members: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
        allowNull: false,
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
    modelName: "SupportConversation",
    tableName: "support_conversations",
    timestamps: false,
});
exports.default = SupportConversation;
//# sourceMappingURL=SupportConversation.js.map