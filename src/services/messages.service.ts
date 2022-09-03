import { CreateMessageDto } from "../dtos/message.dto";
import HttpException from "../exceptions/HttpException";
import { Message } from "../interfaces/message.interface";
import messageModel from "../models/message.model";


export class MessageService {
  public messagesData = messageModel;

  public constructor(private logger: any) {
  }

  public async findAllUsersFromMessages(): Promise<String[]> {
    const messages: Message[] = await this.messagesData.find();
    const users = messages.map(message => message.username)
    return users;
  }

  public async findAllMessages(): Promise<Message[]> {
    const messages: Message[] = await this.messagesData.find();
    return messages;
  }

  public async createMessage(message: CreateMessageDto): Promise<Message> {
    this.logger.info('MessageService::createMessage Start ', new Date().toJSON());
    const createdMessage: Message = await this.messagesData.create(message);
    if (createdMessage == null) {
      this.logger.warn('MessageService::createMessage Failed to create message ', new Date().toJSON());
      //throw new HttpException(400, `Failed to save message: ${message}`);
    }
    return createdMessage;
  }
}