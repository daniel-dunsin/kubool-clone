import { object, string } from "yup";

export const sendMessageInput = object({
  params: object({
    username: string().required("provide username"),
  }),
  body: object({
    message: string().required("message is required").min(8, "essage should not be less than 8 characters"),
  }),
});
