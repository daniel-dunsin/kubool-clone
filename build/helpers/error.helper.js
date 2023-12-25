"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../schema/error/custom.error");
function errorHandler(error, req, res, next) {
    var _a, _b;
    if (error instanceof custom_error_1.ServiceException) {
        return res.status(error === null || error === void 0 ? void 0 : error.code).json({ error: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error });
    }
    res.status(500).json({ error: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : error });
}
exports.errorHandler = errorHandler;
