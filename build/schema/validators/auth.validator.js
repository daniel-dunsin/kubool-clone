"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordInput = exports.forgotPasswordInput = exports.googleAuthInput = exports.signInInput = exports.signUpInput = void 0;
const yup_1 = require("yup");
exports.signUpInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        username: (0, yup_1.string)().required("username is required"),
        password: (0, yup_1.string)().required("password is required").min(8, "Password should not be less than 8 characters"),
    }),
});
exports.signInInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        username: (0, yup_1.string)().default(""),
        email: (0, yup_1.string)().default(""),
        password: (0, yup_1.string)().required("password is required").min(8, "Password should not be less than 8 characters"),
    }),
});
exports.googleAuthInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        accessToken: (0, yup_1.string)().required("accessToken is required"),
    }),
});
exports.forgotPasswordInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)().required("email is required").email("enter a valid email"),
    }),
});
exports.resetPasswordInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        token: (0, yup_1.string)().required("token is required"),
        password: (0, yup_1.string)().required("password is required").min(8, "password should not be less than 8 characters"),
    }),
});
