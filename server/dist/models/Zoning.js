"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Zoning extends sequelize_1.Model {
}
Zoning.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    zoneType: {
        type: sequelize_1.DataTypes.ENUM('residential', 'commercial', 'industrial'),
        allowNull: false,
    },
    maxHeight: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    maxFloors: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    minGreenSpace: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    restrictions: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    coordinates: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Zoning',
    tableName: 'zoning_restrictions',
    timestamps: false,
});
exports.default = Zoning;
//# sourceMappingURL=Zoning.js.map