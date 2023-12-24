import expressAsyncHandler from "express-async-handler";
import { googleSignIn, signIn, signUp } from "../services/auth.service";
import { Request } from "express";
import { SignInDTO, SignUpDTO, UpdateEmailDTO } from "../schema/dto/auth.dto";

export const signUpController = expressAsyncHandler((req: Request<{}, {}, SignUpDTO>, res, next) => {
  signUp(req.body)
    .then((data) => res.status(201).json(data))
    .catch((error) => next(error));
});

export const signInController = expressAsyncHandler((req: Request<{}, {}, SignInDTO>, res, next) => {
  signIn(req.body)
    .then((data) => res.status(200).json(data))
    .catch((error) => next(error));
});

export const googleSignInController = expressAsyncHandler(
  (req: Request<{}, {}, { accessToken: string }>, res, next) => {
    googleSignIn(req.body.accessToken)
      .then((data) => res.status(200).json(data))
      .catch((error) => next(error));
  }
);
