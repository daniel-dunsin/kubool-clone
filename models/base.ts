import { Model, CreationOptional } from "sequelize";
import { DBType } from "../schema/types/db.type";

export class BaseModel<C extends {} = any> extends Model<C> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate?: (db: DBType) => void;
}
