import paginate from "../helpers/pagination.helper";
import { db } from "../models";
import { MessageModel } from "../models/messages.model";
import { UserModel } from "../models/user.model";
import { ArchiveMessageDTO, GetMessagesDTO, SendMessageDTO } from "../schema/dto/message.dto";
import { ServiceException } from "../schema/error/custom.error";

export async function sendMessage(data: SendMessageDTO): Promise<MessageModel> {
  return await UserModel.findOne({ where: { username: data.username } }).then(async (user) => {
    if (!user) throw new ServiceException(404, "User does not exist");
    return await MessageModel.create({ message: data.message, userId: user.id, archived: false });
  });
}

export async function archiveMessage(data: ArchiveMessageDTO): Promise<MessageModel> {
  return await UserModel.findOne({ where: { id: data.userId } }).then(async (user) => {
    if (!user) throw new ServiceException(404, "User does not exist");
    return await MessageModel.findOne({ where: { id: data.id } }).then(async (message) => {
      if (!message) throw new ServiceException(404, "Message does not exist");
      if (message.userId != user.id) throw new ServiceException(400, "This message does not belong to you");

      message.archived = true;
      return await message.save();
    });
  });
}

export async function getUserMessages(data: GetMessagesDTO) {
  return await UserModel.findOne({ where: { id: data.userId } }).then(async (user) => {
    if (!user) throw new ServiceException(404, "User does not exist");
    return await paginate<MessageModel>({
      model: MessageModel,
      query: { userId: user.id, archived: false },
      page: data.page as number,
      limit: data.limit as number,
      include: [{ model: db.User, attributes: ["username", "email", "id"] }],
    });
  });
}

export async function getArchivedMessages(data: GetMessagesDTO) {
  return await UserModel.findOne({ where: { id: data.userId } }).then(async (user) => {
    if (!user) throw new ServiceException(404, "User does not exist");
    return await paginate<MessageModel>({
      model: MessageModel,
      query: { userId: user.id, archived: true },
      page: data.page as number,
      limit: data.limit as number,
      include: [{ model: db.User, attributes: ["username", "email", "id"] }],
    });
  });
}
