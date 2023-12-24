import { SendMailOptions } from "nodemailer";

export interface EmailOptions<T = any> extends SendMailOptions {
  data: T;
  template: string;
}
