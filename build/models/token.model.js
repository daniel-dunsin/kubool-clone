"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const sequelize_1 = require("sequelize");
const token_enum_1 = require("../schema/enums/token.enum");
const base_1 = require("./base");
class TokenModel extends base_1.BaseModel {
}
exports.TokenModel = TokenModel;
function init(sequelize) {
    TokenModel.init({
        id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        username: { type: sequelize_1.DataTypes.STRING, allowNull: false, autoIncrement: false },
        type: { type: sequelize_1.DataTypes.ENUM(...Object.values(token_enum_1.TokenType)), allowNull: false },
        value: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    }, { sequelize, tableName: "tokens", modelName: "Token" });
    return TokenModel;
}
exports.default = init;
