"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileController = exports.updateUsernameController = exports.updateEmailController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_service_1 = require("../services/user.service");
exports.updateEmailController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, user_service_1.updateEmail)(Object.assign(Object.assign({}, req.body), { userId: parseInt(req.userId) }))
        .then((data) => res.status(200).json(data))
        .catch((error) => next(error));
});
exports.updateUsernameController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, user_service_1.updateUsername)(Object.assign(Object.assign({}, req.body), { userId: parseInt(req.userId) }))
        .then((data) => res.status(200).json(data))
        .catch((error) => next(error));
});
exports.getUserProfileController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, user_service_1.getUserProfile)(parseInt(req.userId))
        .then((data) => res.status(200).json(data))
        .catch((error) => next(error));
});
