"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const secrets_const_1 = __importDefault(require("./constants/secrets.const"));
const path_1 = __importDefault(require("path"));
const models_1 = require("./models");
const routes_1 = __importDefault(require("./routes"));
const error_helper_1 = require("./helpers/error.helper");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const logger_helper_1 = __importDefault(require("./helpers/logger.helper"));
const swagger_ui_express_1 = require("swagger-ui-express");
const yamljs_1 = __importDefault(require("yamljs"));
const is_dev = secrets_const_1.default.nodeEnv === "development";
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
is_dev && app.use((0, morgan_1.default)("dev"));
app.use("/api/v1", routes_1.default);
const docPath = path_1.default.join(__dirname, is_dev ? "" : "../", "api.yaml");
const docFile = yamljs_1.default.load(docPath);
app.use("/api/v1/doc", swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(docFile));
app.use(error_helper_1.errorHandler);
app.all("*", (req, res) => res.status(404).json({ error: "Route does not exist" }));
const port = (_a = secrets_const_1.default.port) !== null && _a !== void 0 ? _a : 3001;
app.listen(port, () => {
    logger_helper_1.default.info(`[⚡server]: server is listening on http://localhost:${port}`);
    models_1.sequelize
        .sync()
        .then(() => {
        logger_helper_1.default.info(`[⚡database]: database connected`);
    })
        .catch((error) => {
        logger_helper_1.default.error("[❌database]", error);
    });
});
