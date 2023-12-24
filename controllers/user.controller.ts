import expressAsyncHandler from "express-async-handler";
import { Request } from "express";
import { UpdateEmailDTO, UpdateUsernameDTO } from "../schema/dto/auth.dto";
import { getUserProfile, updateEmail, updateUsername } from "../services/user.service";

export const updateEmailController = expressAsyncHandler((req: Request<{}, {}, UpdateEmailDTO>, res, next) => {
  updateEmail({ ...req.body, userId: parseInt(req.userId) })
    .then((data) => res.status(200).json(data))
    .catch((error) => next(error));
});

export const updateUsernameController = expressAsyncHandler((req: Request<{}, {}, UpdateUsernameDTO>, res, next) => {
  updateUsername({ ...req.body, userId: parseInt(req.userId) })
    .then((data) => res.status(200).json(data))
    .catch((error) => next(error));
});

export const getUserProfileController = expressAsyncHandler((req: Request, res, next) => {
  getUserProfile(parseInt(req.userId))
    .then((data) => res.status(200).json(data))
    .catch((error) => next(error));
});
