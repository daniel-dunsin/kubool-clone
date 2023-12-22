import { Sequelize } from "sequelize";
import secrets from "../constants/secrets.const";
import { DBType } from "../schema/types/db.type";
import { readdir } from "fs";
import path from "path";

const sequelize = new Sequelize(secrets.databaseUrl, { dialect: "postgres", logging: false });
const db: DBType = {};
const basename = path.basename(__filename);

readdir(__dirname, (error, files) => {
  if (error) throw new Error(error.message);
  Promise.all(
    files
      .filter(
        (file) =>
          file.indexOf(".") != 0 && (file.endsWith(".model.js") || file.endsWith(".model.ts")) && file != basename
      )
      .map((file) => import(path.join(__dirname, file)))
  ).then(async (imports) => {
    for (const file of imports) {
      const model = file.default(sequelize);
      db[model.name] = model;
    }
    // associate db
    Object.values(db).forEach((model) => {
      model.associate && model.associate(db);
    });
  });
});

export { sequelize, db };
