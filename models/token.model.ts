import { DataTypes, Sequelize } from "sequelize";
import { TokenType } from "../schema/enums/token.enum";
import { Token } from "../schema/interfaces/token.interface";
import { BaseModel } from "./base";

export class TokenModel extends BaseModel<Token> {
  declare username: string;
  declare value: string;
  declare type: TokenType;
}

export default function init(sequelize: Sequelize): typeof TokenModel {
  TokenModel.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      username: { type: DataTypes.STRING, allowNull: false, autoIncrement: false },
      type: { type: DataTypes.ENUM(...Object.values(TokenType)), allowNull: false },
      value: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: "tokens", modelName: "Token" }
  );

  return TokenModel;
}
