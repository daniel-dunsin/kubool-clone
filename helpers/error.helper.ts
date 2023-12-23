import { ServiceException } from "../schema/error/custom.error";
import { Request, Response, NextFunction } from "express";

export function errorHandler(error: Error | ServiceException, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ServiceException) {
    return res.status(error?.code).json({ error: error?.message ?? error });
  }
  res.status(500).json({ error: error?.message ?? error });
}
