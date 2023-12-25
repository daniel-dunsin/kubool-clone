"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageInput = void 0;
const yup_1 = require("yup");
exports.sendMessageInput = (0, yup_1.object)({
    params: (0, yup_1.object)({
        username: (0, yup_1.string)().required("provide username"),
    }),
    body: (0, yup_1.object)({
        message: (0, yup_1.string)().required("message is required").min(8, "essage should not be less than 8 characters"),
    }),
});
