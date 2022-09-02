import { CreateMessageDto } from "../dtos/message.dto";
import HttpException from "../exceptions/HttpException";
import { Message } from "../interfaces/message.interface";
import messageModel from "../models/message.model";


export class MessageService {
  public messagesData = messageModel;

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
    const createdMessage: Message = await this.messagesData.create(message);
    if (createdMessage == null) {
      throw new HttpException(400, `Failed to save message: ${message}`);
    }
    return createdMessage;
  }

  // public async findUserById(userId: string): Promise<User> {
  //   const user = await this.users.findById(userId);
  //   if (user) return user;
  //   throw new HttpException(409, "You're not user");
  // }

 

  // public async updateUser(userId: string, userData: User): Promise<User> {
  //   const user = await this.users.findByIdAndUpdate(userId, userData);
  //   if (user) return user;
  //   throw new HttpException(409, "You're not user");
  // }

  // public async deleteUserData(userId: string): Promise<User> {
  //   const user = await this.users.findByIdAndDelete(userId);
  //   if (user) return user;
  //   throw new HttpException(409, "You're not user");
  // }
}