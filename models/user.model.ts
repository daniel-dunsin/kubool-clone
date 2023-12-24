import { DataTypes, Sequelize } from "sequelize";
import { User } from "../schema/interfaces/user.interface";
import { BaseModel } from "./base";
import bcrypt from "bcryptjs";

export class UserModel extends BaseModel<User> {
  declare email: string;
  declare username: string;
  declare password: string;

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

export default function init(sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING, validate: { isEmail: true }, unique: true, allowNull: true },
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: {
        type: DataTypes.STRING,
        async set(value: string) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
    },
    { sequelize, tableName: "users", modelName: "User" }
  );

  return UserModel;
}
