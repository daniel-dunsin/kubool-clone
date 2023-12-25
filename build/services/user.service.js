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
exports.getUserProfile = exports.updateUsername = exports.updateEmail = void 0;
const lodash_1 = __importDefault(require("lodash"));
const user_model_1 = require("../models/user.model");
const custom_error_1 = require("../schema/error/custom.error");
function updateEmail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.findOne({ where: { email: data.email } }).then((user) => __awaiter(this, void 0, void 0, function* () {
            if (user)
                throw new custom_error_1.ServiceException(400, "a user with this email already exists");
            yield user_model_1.UserModel.update({ email: data.email }, { where: { id: data.userId } });
            return { message: "email updated" };
        }));
    });
}
exports.updateEmail = updateEmail;
function updateUsername(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.findOne({ where: { username: data.username } }).then((unknownUser) => __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.UserModel.findOne({ where: { id: data.userId } }).then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user)
                    throw new custom_error_1.ServiceException(404, "user does not exist");
                if (unknownUser && (unknownUser === null || unknownUser === void 0 ? void 0 : unknownUser.id) != (user === null || user === void 0 ? void 0 : user.id))
                    throw new custom_error_1.ServiceException(400, "a user with this username exists");
                user.username = data.username;
                yield user.save();
            }));
            return { message: "username updated" };
        }));
    });
}
exports.updateUsername = updateUsername;
function getUserProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.findOne({ where: { id: userId } }).then((user) => {
            if (!user)
                throw new custom_error_1.ServiceException(404, "User does not exist");
            return lodash_1.default.omit(user.dataValues, "password");
        });
    });
}
exports.getUserProfile = getUserProfile;
