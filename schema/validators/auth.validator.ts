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
