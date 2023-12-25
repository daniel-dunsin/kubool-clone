"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceException = void 0;
class ServiceException extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ServiceException = ServiceException;
