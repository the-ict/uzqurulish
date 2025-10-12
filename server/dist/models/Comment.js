"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Comment extends sequelize_1.Model {
    static associate(models) {
        Comment.belongsTo(models.Project, {
            foreignKey: "projectId",
            as: "project",
        });
        Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
}
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    projectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "projects",
            key: "id",
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
});
exports.default = Comment;
//# sourceMappingURL=Comment.js.map