import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ArchiveMessageDTO, SendMessageDTO } from "../schema/dto/message.dto";
import { archiveMessage, getArchivedMessages, getUserMessages, sendMessage } from "../services/message.service";
import { DefaultQuery } from "../schema/interfaces/query.interface";

export const sendMessageController = expressAsyncHandler(
  (
    req: Request<Pick<SendMessageDTO, "username">, {}, Pick<SendMessageDTO, "message">>,
    res: Response,
    next: NextFunction
  ) => {
    sendMessage({ ...req.body, username: req.params.username })
      .then((data) => res.status(201).json(data))
      .catch((e) => next(e));
  }
);

export const archiveMessageController = expressAsyncHandler((req: Request, res: Response, next: NextFunction) => {
  archiveMessage({ id: parseInt(req.params.id), userId: parseInt(req.userId) })
    .then((data) => res.status(200).json(data))
    .catch((e) => next(e));
});

export const getUserMessagesController = expressAsyncHandler(
  (req: Request<{}, {}, {}, DefaultQuery>, res: Response, next: NextFunction) => {
    getUserMessages({ userId: parseInt(req.userId), page: req.query.page, limit: req.query.limit })
      .then((data) => res.status(200).json(data))
      .catch((e) => next(e));
  }
);

export const getArchivedMessagesController = expressAsyncHandler(
  (req: Request<{}, {}, {}, DefaultQuery>, res: Response, next: NextFunction) => {
    getArchivedMessages({ userId: parseInt(req.userId), page: req.query.page, limit: req.query.limit })
      .then((data) => res.status(200).json(data))
      .catch((e) => next(e));
  }
);
