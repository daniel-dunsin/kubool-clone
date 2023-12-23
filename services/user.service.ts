import { UserModel } from "../models/user.model";
import { UpdateEmailDTO, UpdateUsernameDTO } from "../schema/dto/auth.dto";
import { ServiceException } from "../schema/error/custom.error";

export async function updateEmail(data: UpdateEmailDTO) {
  return UserModel.findOne({ where: { email: data.email } }).then(async (user) => {
    if (user) throw new ServiceException(400, "a user with this email already exists");
    await UserModel.update({ email: data.email }, { where: { id: data.userId } });
    return { message: "email updated" };
  });
}

export async function updateUsername(data: UpdateUsernameDTO) {
  return UserModel.findOne({ where: { username: data.username } }).then(async (user) => {
    if (user) throw new ServiceException(400, "a user with this username exists");
    await UserModel.update({ username: data.username }, { where: { id: data.userId } });
    return { message: "username updated" };
  });
}
