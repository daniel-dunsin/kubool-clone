import { Model, ModelAttributes, CreationAttributes } from "sequelize";

export type DBType = {
  [key: string]: Model<ModelAttributes, CreationAttributes<any>> & { associate(db: DBType): void };
};
