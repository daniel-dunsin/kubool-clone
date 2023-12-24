import { Model, ModelAttributes, CreationAttributes, ModelStatic } from "sequelize";

export type DBType = {
  [key: string]: ModelStatic<Model<any, any>> & { associate(db: DBType): void };
};
