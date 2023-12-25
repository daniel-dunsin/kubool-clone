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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = require("nodemailer");
const secrets_const_1 = __importDefault(require("../constants/secrets.const"));
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
const email_helper_1 = require("../helpers/email.helper");
const transporter = (0, nodemailer_1.createTransport)({
    service: "gmail",
    auth: {
        user: secrets_const_1.default.email.user,
        pass: secrets_const_1.default.email.pass,
    },
});
transporter.on("token", () => {
    logger_helper_1.default.info("[⚡mailer]:email transporter is connected");
});
transporter.on("error", (e) => {
    logger_helper_1.default.info("[❌mailer]:unable to connect to transporter", e);
});
function sendMail(_a) {
    var { data, template } = _a, options = __rest(_a, ["data", "template"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield transporter
            .sendMail(Object.assign({ from: secrets_const_1.default.email.user, html: (0, email_helper_1.renderTemplate)(data, template) }, options))
            .catch((e) => logger_helper_1.default.error("unable to send mail", e));
    });
}
exports.sendMail = sendMail;
