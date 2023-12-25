"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const auth_validator_1 = require("../schema/validators/auth.validator");
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/register", (0, validate_middleware_1.default)(auth_validator_1.signUpInput), auth_controller_1.signUpController);
authRoutes.post("/login", (0, validate_middleware_1.default)(auth_validator_1.signInInput), auth_controller_1.signInController);
authRoutes.post("/google", (0, validate_middleware_1.default)(auth_validator_1.googleAuthInput), auth_controller_1.googleSignInController);
authRoutes.post("/password/forgot", (0, validate_middleware_1.default)(auth_validator_1.forgotPasswordInput), auth_controller_1.forgotPasswordController);
authRoutes.patch("/password/reset", (0, validate_middleware_1.default)(auth_validator_1.resetPasswordInput), auth_controller_1.resetPasswordController);
exports.default = authRoutes;
