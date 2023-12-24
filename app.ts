import express from "express";
import secrets from "./constants/secrets.const";
import path from "path";
import { sequelize } from "./models";
import routes from "./routes";
import { errorHandler } from "./helpers/error.helper";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import logger from "./helpers/logger.helper";

const app = express();
app.set("view engine", "ejs");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
if (secrets.nodeEnv === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", routes);

app.use(errorHandler);
app.all("*", (req, res) => res.status(404).json({ error: "Route does not exist" }));

const port = secrets.port ?? 3001;
app.listen(port, () => {
  logger.info(`[⚡server]: server is listening on http://localhost:${port}`);
  // sequelize
  //   .sync()
  //   .then(() => {
  //     logger.info(`[⚡database]: database connected`);
  //   })
  //   .catch((error) => {
  //     logger.error("[❌database]", error);
  //   });
});
