import { createTransport } from "nodemailer";
import secrets from "../constants/secrets.const";
import { EmailOptions } from "../schema/interfaces/email.interface";
import logger from "../helpers/logger.helper";
import { renderTemplate } from "../helpers/email.helper";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: secrets.email.user,
    pass: secrets.email.pass,
  },
});

transporter.on("token", () => {
  logger.info("[⚡mailer]:email transporter is connected");
});

transporter.on("error", (e) => {
  logger.info("[❌mailer]:unable to connect to transporter", e);
});

export async function sendMail<T>({ data, template, ...options }: EmailOptions<T>) {
  return await transporter
    .sendMail({
      from: secrets.email.user,
      html: renderTemplate(data, template),
      ...options,
    })
    .catch((e) => logger.error("unable to send mail", e));
}
