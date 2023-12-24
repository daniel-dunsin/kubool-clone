import { Op } from "sequelize";
import JWTHelper from "../helpers/jwt.helper";
import { UserModel } from "../models/user.model";
import { SignInDTO, SignUpDTO, UpdateEmailDTO } from "../schema/dto/auth.dto";
import { ServiceException } from "../schema/error/custom.error";
import { User } from "../schema/interfaces/user.interface";
import _ from "lodash";
import { google } from "googleapis";
import secrets from "../constants/secrets.const";
import slugify from "../helpers/slugify.helper";

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
