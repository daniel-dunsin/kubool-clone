import { object, string } from "yup";

export const editEmailnput = object({
  body: object({
    email: string().required("email is required").email("enter a valid email"),
  }),
});

export const editUsernameInput = object({
  body: object({
    username: string().required("username is required"),
  }),
});
