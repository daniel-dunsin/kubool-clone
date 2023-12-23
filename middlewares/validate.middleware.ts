import { NextFunction, Request, Response } from "express";
import { Schema } from "yup";

export default function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate({ body: req.body, query: req.query, params: req.params })
      .then(() => next())
      .catch((e) => next(e));
  };
}
