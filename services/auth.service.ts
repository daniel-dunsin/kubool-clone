import { Op } from "sequelize";
import JWTHelper from "../helpers/jwt.helper";
import { UserModel } from "../models/user.model";
import { SignInDTO, SignUpDTO, UpdateEmailDTO } from "../schema/dto/auth.dto";
import { ServiceException } from "../schema/error/custom.error";
import { User } from "../schema/interfaces/user.interface";
import _ from "lodash";

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
