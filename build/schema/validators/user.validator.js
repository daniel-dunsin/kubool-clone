"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUsernameInput = exports.editEmailnput = void 0;
const yup_1 = require("yup");
exports.editEmailnput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)().required("email is required").email("enter a valid email"),
    }),
});
exports.editUsernameInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        username: (0, yup_1.string)().required("username is required"),
    }),
});
