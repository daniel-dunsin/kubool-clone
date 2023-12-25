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
exports.resetPassword = exports.forgotPassword = exports.googleSignIn = exports.verifyGoogleUser = exports.signIn = exports.signUp = void 0;
const sequelize_1 = require("sequelize");
const jwt_helper_1 = __importDefault(require("../helpers/jwt.helper"));
const user_model_1 = require("../models/user.model");
const custom_error_1 = require("../schema/error/custom.error");
const lodash_1 = __importDefault(require("lodash"));
const googleapis_1 = require("googleapis");
const secrets_const_1 = __importDefault(require("../constants/secrets.const"));
const slugify_helper_1 = __importDefault(require("../helpers/slugify.helper"));
const crypto_1 = __importDefault(require("crypto"));
const token_model_1 = require("../models/token.model");
const token_enum_1 = require("../schema/enums/token.enum");
const email_service_1 = require("./email.service");
function auth(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield jwt_helper_1.default.sign(user);
        return { user, token };
    });
}
function signUp(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.findOne({ where: { username: data.username } }).then((user) => {
            if (user)
                throw new custom_error_1.ServiceException(400, "A user with this username exists");
            return user_model_1.UserModel.create(Object.assign({}, data), { returning: true }).then((user) => __awaiter(this, void 0, void 0, function* () {
                return auth(lodash_1.default.omit(user.dataValues, "password"));
            }));
        });
    });
}
exports.signUp = signUp;
function signIn(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.findOne({
            where: { [sequelize_1.Op.or]: [{ username: (_a = data.username) !== null && _a !== void 0 ? _a : "" }, { email: (_b = data === null || data === void 0 ? void 0 : data.email) !== null && _b !== void 0 ? _b : "" }] },
        }).then((user) => __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new custom_error_1.ServiceException(400, "invalid login credentials");
            return yield user.comparePassword(data.password).then((match) => {
                if (!match)
                    throw new custom_error_1.ServiceException(400, "invalid login credentials");
                return auth(lodash_1.default.omit(user.dataValues, "password"));
            });
        }));
    });
}
exports.signIn = signIn;
function verifyGoogleUser(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const authClient = new googleapis_1.google.auth.OAuth2({
            clientId: secrets_const_1.default.google.clientId,
            clientSecret: secrets_const_1.default.google.clientSecret,
        });
        authClient.setCredentials({ access_token: accessToken });
        const oauth = googleapis_1.google.oauth2({ auth: authClient, version: "v2" });
        return yield oauth.userinfo.get().then((user) => {
            return { email: user.data.email, username: (0, slugify_helper_1.default)(user.data.name) };
        });
    });
}
exports.verifyGoogleUser = verifyGoogleUser;
function googleSignIn(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield verifyGoogleUser(accessToken).then((userData) => __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findOne({ where: { email: userData.email } }).then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    return yield user_model_1.UserModel.create({ username: userData.username, email: userData.email });
                }
                return user;
            }));
        }));
    });
}
exports.googleSignIn = googleSignIn;
function forgotPassword(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.UserModel.findOne({ where: { email } }).then((user) => __awaiter(this, void 0, void 0, function* () {
            if (user) {
                const token = crypto_1.default.randomBytes(30).toString("hex");
                return yield token_model_1.TokenModel.findOrCreate({
                    where: { type: token_enum_1.TokenType.PASSWORD_RESET_TOKEN, username: user.username },
                    defaults: {
                        value: token,
                        type: token_enum_1.TokenType.PASSWORD_RESET_TOKEN,
                        username: user.username,
                    },
                }).then(([newToken, isCreated]) => __awaiter(this, void 0, void 0, function* () {
                    if (!isCreated) {
                        newToken.value = token;
                        yield newToken.save();
                    }
                    const mailData = {
                        username: user.username,
                        link: `${secrets_const_1.default.frontendUrl}/auth/password/reset/${token}`,
                    };
                    return yield (0, email_service_1.sendMail)({
                        to: user.email,
                        subject: "",
                        data: mailData,
                        template: "forgot-password.ejs",
                    });
                }));
            }
        }));
    });
}
exports.forgotPassword = forgotPassword;
function resetPassword(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield token_model_1.TokenModel.findOne({ where: { value: data.token } }).then((token) => __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new custom_error_1.ServiceException(404, "Token is invalid or has expired");
            const username = token.username;
            yield user_model_1.UserModel.update({ password: data.password }, { where: { username } });
            yield token.destroy();
        }));
    });
}
exports.resetPassword = resetPassword;
