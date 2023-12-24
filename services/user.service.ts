import _ from "lodash";
import { UserModel } from "../models/user.model";
import { UpdateEmailDTO, UpdateUsernameDTO } from "../schema/dto/auth.dto";
import { ServiceException } from "../schema/error/custom.error";
import { MessageModel } from "../models/messages.model";

export async function updateEmail(data: UpdateEmailDTO) {
  return UserModel.findOne({ where: { email: data.email } }).then(async (user) => {
    if (user) throw new ServiceException(400, "a user with this email already exists");
    await UserModel.update({ email: data.email }, { where: { id: data.userId } });
    return { message: "email updated" };
  });
}

export async function updateUsername(data: UpdateUsernameDTO) {
  return UserModel.findOne({ where: { username: data.username } }).then(async (unknownUser) => {
    await UserModel.findOne({ where: { id: data.userId } }).then(async (user) => {
      if (!user) throw new ServiceException(404, "user does not exist");
      if (unknownUser && unknownUser?.id != user?.id)
        throw new ServiceException(400, "a user with this username exists");

      user.username = data.username as string;
      await user.save();
    });
    return { message: "username updated" };
  });
}

export async function getUserProfile(userId: number) {
  return UserModel.findOne({ where: { id: userId } }).then((user) => {
    if (!user) throw new ServiceException(404, "User does not exist");
    return _.omit(user.dataValues, "password");
  });
}
