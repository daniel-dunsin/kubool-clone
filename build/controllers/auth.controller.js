"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = exports.googleSignInController = exports.signInController = exports.signUpController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_service_1 = require("../services/auth.service");
exports.signUpController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, auth_service_1.signUp)(req.body)
        .then((data) => res.status(201).json(data))
        .catch((error) => next(error));
});
exports.signInController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, auth_service_1.signIn)(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => next(error));
});
exports.googleSignInController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, auth_service_1.googleSignIn)(req.body.accessToken)
        .then((data) => res.status(200).json(data))
        .catch((error) => next(error));
});
exports.forgotPasswordController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, auth_service_1.forgotPassword)(req.body.email)
        .then(() => res.status(200).json({ message: "a password reset link will be sent if your email is registered" }))
        .catch((e) => next(e));
});
exports.resetPasswordController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, auth_service_1.resetPassword)(Object.assign({}, req.body))
        .then(() => res.status(200).json({ message: "password reset successful" }))
        .catch((e) => next(e));
});
