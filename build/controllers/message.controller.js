"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArchivedMessagesController = exports.getUserMessagesController = exports.archiveMessageController = exports.sendMessageController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_service_1 = require("../services/message.service");
exports.sendMessageController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, message_service_1.sendMessage)(Object.assign(Object.assign({}, req.body), { username: req.params.username }))
        .then((data) => res.status(201).json(data))
        .catch((e) => next(e));
});
exports.archiveMessageController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, message_service_1.archiveMessage)({ id: parseInt(req.params.id), userId: parseInt(req.userId) })
        .then((data) => res.status(200).json(data))
        .catch((e) => next(e));
});
exports.getUserMessagesController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, message_service_1.getUserMessages)({ userId: parseInt(req.userId), page: req.query.page, limit: req.query.limit })
        .then((data) => res.status(200).json(data))
        .catch((e) => next(e));
});
exports.getArchivedMessagesController = (0, express_async_handler_1.default)((req, res, next) => {
    (0, message_service_1.getArchivedMessages)({ userId: parseInt(req.userId), page: req.query.page, limit: req.query.limit })
        .then((data) => res.status(200).json(data))
        .catch((e) => next(e));
});
