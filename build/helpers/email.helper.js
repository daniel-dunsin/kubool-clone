"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
const path_1 = __importDefault(require("path"));
const ejs_1 = require("ejs");
const custom_error_1 = require("../schema/error/custom.error");
function renderTemplate(data, filePath) {
    const file = path_1.default.join(__dirname, "../templates", filePath);
    let html;
    (0, ejs_1.renderFile)(file, Object.assign({}, data), (error, data) => {
        if (error)
            throw new custom_error_1.ServiceException(400, "Unable to render template");
        html = data;
    });
    return html;
}
exports.renderTemplate = renderTemplate;
