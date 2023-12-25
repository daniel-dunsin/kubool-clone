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
exports.getArchivedMessages = exports.getUserMessages = exports.archiveMessage = exports.sendMessage = void 0;
const pagination_helper_1 = __importDefault(require("../helpers/pagination.helper"));
const models_1 = require("../models");
const messages_model_1 = require("../models/messages.model");
const user_model_1 = require("../models/user.model");
const custom_error_1 = require("../schema/error/custom.error");
function sendMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.UserModel.findOne({ where: { username: data.username } }).then((user) => __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new custom_error_1.ServiceException(404, "User does not exist");
            return yield messages_model_1.MessageModel.create({ message: data.message, userId: user.id, archived: false });
        }));
    });
}
exports.sendMessage = sendMessage;
function archiveMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.UserModel.findOne({ where: { id: data.userId } }).then((user) => __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new custom_error_1.ServiceException(404, "User does not exist");
            return yield messages_model_1.MessageModel.findOne({ where: { id: data.id } }).then((message) => __awaiter(this, void 0, void 0, function* () {
                if (!message)
                    throw new custom_error_1.ServiceException(404, "Message does not exist");
                if (message.userId != user.id)
                    throw new custom_error_1.ServiceException(400, "This message does not belong to you");
                message.archived = true;
                return yield message.save();
            }));
        }));
    });
}
exports.archiveMessage = archiveMessage;
function getUserMessages(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.UserModel.findOne({ where: { id: data.userId } }).then((user) => __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new custom_error_1.ServiceException(404, "User does not exist");
            return yield (0, pagination_helper_1.default)({
                model: messages_model_1.MessageModel,
                query: { userId: user.id, archived: false },
                page: data.page,
                limit: data.limit,
                include: [{ model: models_1.db.User, attributes: ["username", "email", "id"] }],
            });
        }));
    });
}
exports.getUserMessages = getUserMessages;
function getArchivedMessages(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.UserModel.findOne({ where: { id: data.userId } }).then((user) => __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new custom_error_1.ServiceException(404, "User does not exist");
            return yield (0, pagination_helper_1.default)({
                model: messages_model_1.MessageModel,
                query: { userId: user.id, archived: true },
                page: data.page,
                limit: data.limit,
                include: [{ model: models_1.db.User, attributes: ["username", "email", "id"] }],
            });
        }));
    });
}
exports.getArchivedMessages = getArchivedMessages;
