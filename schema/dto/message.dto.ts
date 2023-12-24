import { DefaultQuery } from "../interfaces/query.interface";

export interface SendMessageDTO {
  message: string;
  username: string;
}

export interface ArchiveMessageDTO {
  id: number;
  userId: number;
}

export interface GetMessagesDTO extends DefaultQuery {
  userId?: number;
}
