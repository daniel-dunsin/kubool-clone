"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_validator_1 = require("../schema/validators/user.validator");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", auth_middleware_1.default, user_controller_1.getUserProfileController);
userRoutes.put("/email", auth_middleware_1.default, (0, validate_middleware_1.default)(user_validator_1.editEmailnput), user_controller_1.updateEmailController);
userRoutes.put("/username", auth_middleware_1.default, (0, validate_middleware_1.default)(user_validator_1.editUsernameInput), user_controller_1.updateUsernameController);
exports.default = userRoutes;
