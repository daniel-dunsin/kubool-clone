import { object, string } from "yup";

export const signUpInput = object({
  body: object({
    username: string().required("username is required"),
    password: string().required("password is required").min(8, "Password should not be less than 8 characters"),
  }),
});

export const signInInput = object({
  body: object({
    username: string().default(""),
    email: string().default(""),
    password: string().required("password is required").min(8, "Password should not be less than 8 characters"),
  }),
});

export const googleAuthInput = object({
  body: object({
    accessToken: string().required("accessToken is required"),
  }),
});

export const forgotPasswordInput = object({
  body: object({
    email: string().required("email is required").email("enter a valid email"),
  }),
});

export const resetPasswordInput = object({
  body: object({
    token: string().required("token is required"),
    password: string().required("password is required").min(8, "password should not be less than 8 characters"),
  }),
});
