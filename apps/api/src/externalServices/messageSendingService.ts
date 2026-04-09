import { formatErrorResponse } from "../utils/apiResponses.ts";
import { EmailClient, HttpException, MESSAGE_TYPES } from "../utils/index.ts";

import { Container } from "typedi";

interface MessageContent {
  getFormattedMessage: () => Promise<string>;
  getSubject: () => string;
}

type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];

type Receiver = string | string[];

export default class MessageSendingService {
  static sendMessageException(error: string): HttpException.ServerError {
    return new HttpException.ServerError(
      formatErrorResponse("sendMessage", error)
    );
  }

  static async sendMessage(
    content: MessageContent,
    receiver: Receiver,
    messageSendType: MessageType,
    attachments?: any[]
  ): Promise<any> {
    if (!receiver || receiver.length === 0) {
      throw MessageSendingService.sendMessageException("invalidReceiver");
    }

    if (messageSendType === MESSAGE_TYPES.EMAIL) {
      return await this.sendEmailMessage(content, receiver, attachments);
    }

    throw MessageSendingService.sendMessageException("invalidMessageType");
  }

  // Handle email message sending
  static async sendEmailMessage(
    message: MessageContent,
    receiver: Receiver,
    attachments?: any[]
  ): Promise<any> {
    let formattedMessage: string;
    try {
      formattedMessage = await message.getFormattedMessage();
    } catch (err) {
      console.error(err);
      throw MessageSendingService.sendMessageException("formattedMessage");
    }

    const subject = message.getSubject();

    if (!subject || subject.length === 0) {
      throw MessageSendingService.sendMessageException("invalidSubject");
    }

    if (!receiver || receiver.length === 0) {
      throw MessageSendingService.sendMessageException("invalidReceiver");
    }

    const emailClient = Container.get(EmailClient) as EmailClient;
    const receiverArray = Array.isArray(receiver) ? receiver : [receiver];
    return await emailClient.sendEmail(subject, formattedMessage, receiverArray, attachments);
  }
}
