import { Op } from "sequelize";
import JWTHelper from "../helpers/jwt.helper";
import { UserModel } from "../models/user.model";
import { ForgotPasswordMailDTO, ResetPasswordDTO, SignInDTO, SignUpDTO, UpdateEmailDTO } from "../schema/dto/auth.dto";
import { ServiceException } from "../schema/error/custom.error";
import { User } from "../schema/interfaces/user.interface";
import _ from "lodash";
import { google } from "googleapis";
import secrets from "../constants/secrets.const";
import slugify from "../helpers/slugify.helper";
import crypto from "crypto";
import { TokenModel } from "../models/token.model";
import { TokenType } from "../schema/enums/token.enum";
import { sendMail } from "./email.service";

async function auth(user: Omit<User, "password">) {
  const token = await JWTHelper.sign(user);
  return { user, token };
}

export async function signUp(data: SignUpDTO) {
  return UserModel.findOne({ where: { username: data.username } }).then((user) => {
    if (user) throw new ServiceException(400, "A user with this username exists");
    return UserModel.create({ ...data }, { returning: true }).then(async (user) => {
      return auth(_.omit(user.dataValues, "password"));
    });
  });
}

export async function signIn(data: SignInDTO) {
  return UserModel.findOne({
    where: { [Op.or]: [{ username: data.username ?? "" }, { email: data?.email ?? "" }] },
  }).then(async (user) => {
    if (!user) throw new ServiceException(400, "invalid login credentials");

    return await user.comparePassword(data.password).then((match) => {
      if (!match) throw new ServiceException(400, "invalid login credentials");
      return auth(_.omit(user.dataValues, "password"));
    });
  });
}

export async function verifyGoogleUser(accessToken: string): Promise<Pick<UserModel, "username" | "email">> {
  const authClient = new google.auth.OAuth2({
    clientId: secrets.google.clientId,
    clientSecret: secrets.google.clientSecret,
  });

  authClient.setCredentials({ access_token: accessToken });

  const oauth = google.oauth2({ auth: authClient, version: "v2" });

  return await oauth.userinfo.get().then((user) => {
    return { email: <string>user.data.email, username: slugify(<string>user.data.name) };
  });
}

export async function googleSignIn(accessToken: string) {
  return await verifyGoogleUser(accessToken).then(async (userData) => {
    return await UserModel.findOne({ where: { email: userData.email } }).then(async (user) => {
      if (!user) {
        return await UserModel.create({ username: userData.username, email: userData.email });
      }
      return user;
    });
  });
}

export async function forgotPassword(email: string) {
  return await UserModel.findOne({ where: { email } }).then(async (user) => {
    if (user) {
      const token = crypto.randomBytes(30).toString("hex");

      return await TokenModel.findOrCreate({
        where: { type: TokenType.PASSWORD_RESET_TOKEN, username: user.username },
        defaults: {
          value: token,
          type: TokenType.PASSWORD_RESET_TOKEN,
          username: user.username,
        },
      }).then(async ([newToken, isCreated]) => {
        if (!isCreated) {
          newToken.value = token;
          await newToken.save();
        }

        const mailData = {
          username: user.username,
          link: `${secrets.frontendUrl}/auth/password/reset/${token}`,
        };

        return await sendMail<ForgotPasswordMailDTO>({
          to: user.email,
          subject: "",
          data: mailData,
          template: "forgot-password.ejs",
        });
      });
    }
  });
}

export async function resetPassword(data: ResetPasswordDTO) {
  return await TokenModel.findOne({ where: { value: data.token } }).then(async (token) => {
    if (!token) throw new ServiceException(404, "Token is invalid or has expired");

    const username = token.username;
    await UserModel.update({ password: data.password }, { where: { username } });
    await token.destroy();
  });
}
