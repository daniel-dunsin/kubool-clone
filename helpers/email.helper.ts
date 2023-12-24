import path from "path";
import { EmailOptions } from "../schema/interfaces/email.interface";
import { renderFile } from "ejs";
import { ServiceException } from "../schema/error/custom.error";

export function renderTemplate(data: EmailOptions["data"], filePath: string): string | undefined {
  const file = path.join(__dirname, "../templates", filePath);
  let html;
  renderFile(file, { ...data }, (error, data) => {
    if (error) throw new ServiceException(400, "Unable to render template");
    html = data;
  });
  return html;
}
