"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const message_routes_1 = __importDefault(require("./message.routes"));
const routes = (0, express_1.Router)();
routes.use("/auth", auth_routes_1.default);
routes.use("/user", user_routes_1.default);
routes.use("/message", message_routes_1.default);
exports.default = routes;
