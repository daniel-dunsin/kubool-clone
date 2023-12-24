import expressAsyncHandler from "express-async-handler";
import { forgotPassword, googleSignIn, resetPassword, signIn, signUp } from "../services/auth.service";
import { Request } from "express";
import { ResetPasswordDTO, SignInDTO, SignUpDTO, UpdateEmailDTO } from "../schema/dto/auth.dto";

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

export const forgotPasswordController = expressAsyncHandler((req: Request<{}, {}, { email: string }>, res, next) => {
  forgotPassword(req.body.email)
    .then(() => res.status(200).json({ message: "a password reset link will be sent if your email is registered" }))
    .catch((e) => next(e));
});

export const resetPasswordController = expressAsyncHandler((req: Request<{}, {}, ResetPasswordDTO>, res, next) => {
  resetPassword({ ...req.body })
    .then(() => res.status(200).json({ message: "password reset successful" }))
    .catch((e) => next(e));
});
