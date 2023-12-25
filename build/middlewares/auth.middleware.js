"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const custom_error_1 = require("../schema/error/custom.error");
const jwt_helper_1 = __importDefault(require("../helpers/jwt.helper"));
const isAuthenticated = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new custom_error_1.ServiceException(401, "Provide token in this format `Bearer ${token}`");
    }
    const token = authHeader.split(" ")[1];
    if (!token)
        throw new custom_error_1.ServiceException(401, "Provide token");
    jwt_helper_1.default.verify(token)
        .then((payload) => {
        if (!payload)
            throw new custom_error_1.ServiceException(403, "Service is invalid or has expired");
        req.userId = String(payload.id);
        req.username = payload.username;
        next();
    })
        .catch((error) => next(error));
}));
exports.default = isAuthenticated;
