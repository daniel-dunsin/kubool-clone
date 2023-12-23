import expressAsyncHandler from "express-async-handler";
import { ServiceException } from "../schema/error/custom.error";
import JWTHelper from "../helpers/jwt.helper";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      username: string;
    }
  }
}

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ServiceException(401, "Provide token in this format `Bearer ${token}`");
  }

  const token = authHeader.split(" ")[1];
  if (!token) throw new ServiceException(401, "Provide token");

  JWTHelper.verify(token)
    .then((payload) => {
      if (!payload) throw new ServiceException(403, "Service is invalid or has expired");

      req.userId = String(payload.id);
      req.username = payload.username;
      next();
    })
    .catch((error) => next(error));
});

export default isAuthenticated;
