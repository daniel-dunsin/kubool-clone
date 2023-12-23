import express from "express";
import secrets from "./constants/secrets.const";
import path from "path";
import { sequelize } from "./models";
import routes from "./routes";
import { errorHandler } from "./helpers/error.helper";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);

app.use(errorHandler);
app.all("*", (req, res) => res.status(404).json({ error: "Route does not exist" }));

const port = secrets.port ?? 3001;
app.listen(port, () => {
  console.log(`[⚡server]: server is listening on http://localhost:${port}`);
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log(`[⚡database]: database connected`);
    })
    .catch((error) => {
      console.log("[❌database]", error);
    });
});
