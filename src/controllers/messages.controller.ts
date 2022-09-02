import { NextFunction, Request, Response } from 'express';
import { CreateMessageDto } from '../dtos/message.dto';
import { Message } from '../interfaces/message.interface';
import { MessageService } from '../services/messages.service';


export class MessagesController {
  public readonly messageService = new MessageService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: String[] = await this.messageService.findAllUsersFromMessages();
      res.status(200).json({ data: users });
    } catch(error) {
      next(error);
    }
  }

  public getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages: Message[] = await this.messageService.findAllMessages();
      res.status(200).json({ data: messages });
    } catch(error) {
      next(error);
    }
  }

  public createMessage = async (req: Request, res: Response, next: NextFunction) => {
    const message: CreateMessageDto = req.body;
    try {
      const createMessageData: Message = await this.messageService.createMessage(message);
      res.status(201).json({ data: createMessageData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }


  // public getUserById = async (req: Request, res: Response, next: NextFunction) => {
  //   const userId: string = req.params.id;

  //   try {
  //     const findOneUserData: User = await this.userService.findUserById(userId);
  //     res.status(200).json({ data: findOneUserData, message: 'findOne' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  

  // public updateUser = async (req: Request, res: Response, next: NextFunction) => {
  //   const userId: string = req.params.id;
  //   const userData: User = req.body;

  //   try {
  //     const updateUserData: User = await this.userService.updateUser(userId, userData);
  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  //   const userId: string = req.params.id;

  //   try {
  //     const deleteUserData: User = await this.userService.deleteUserData(userId);
  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}