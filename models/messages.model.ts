import { DataTypes, Sequelize } from "sequelize";
import { BaseModel } from "./base";
import { Message } from "../schema/interfaces/message.interface";
import { DBType } from "../schema/types/db.type";

export class MessageModel extends BaseModel<Message> {
  declare message: string;
  declare archived: boolean;
  declare username: string;
}

export default function init(sequelize: Sequelize): typeof MessageModel {
  MessageModel.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      message: { type: DataTypes.STRING(2000), allowNull: false },
      archived: { type: DataTypes.BOOLEAN, defaultValue: false },
      username: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: "messages", modelName: "Message" }
  );

  MessageModel.associate = function (db: DBType) {
    MessageModel.belongsTo(db.User, { foreignKey: "username", onDelete: "cascade" });
  };

  return MessageModel;
}
