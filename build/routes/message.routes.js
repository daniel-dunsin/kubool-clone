"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const message_validator_1 = require("../schema/validators/message.validator");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const messageRoutes = (0, express_1.Router)();
messageRoutes.get("/", auth_middleware_1.default, message_controller_1.getUserMessagesController);
messageRoutes.get("/archive", auth_middleware_1.default, message_controller_1.getArchivedMessagesController);
messageRoutes.post("/:username", (0, validate_middleware_1.default)(message_validator_1.sendMessageInput), message_controller_1.sendMessageController);
messageRoutes.put("/archive/:id", auth_middleware_1.default, message_controller_1.archiveMessageController);
exports.default = messageRoutes;
