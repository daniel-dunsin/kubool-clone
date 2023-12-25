"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const sequelize_1 = require("sequelize");
const base_1 = require("./base");
class MessageModel extends base_1.BaseModel {
}
exports.MessageModel = MessageModel;
function init(sequelize) {
    MessageModel.init({
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        message: { type: sequelize_1.DataTypes.STRING(2000), allowNull: false },
        archived: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
        userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    }, { sequelize, tableName: "messages", modelName: "Message" });
    MessageModel.associate = function (db) {
        MessageModel.belongsTo(db.User, {
            foreignKey: "userId",
            onDelete: "cascade",
        });
    };
    return MessageModel;
}
exports.default = init;
