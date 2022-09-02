import { Router } from 'express';
import { MessagesController } from '../controllers/messages.controller';
import { CreateMessageDto } from '../dtos/message.dto';
import Route from '../interfaces/routes.interface';
//import validationMiddleware from '../middlewares/validation.middleware';
import validationJsonResponseMiddleware from '../middlewares/validationJsonResponse.middleware';

class MessagesRoute implements Route {
  public path = '/messages';
  public router = Router();
  public messagesController = new MessagesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.messagesController.getMessages);
    this.router.get(`${this.path}/users`, this.messagesController.getUsers);
    this.router.post(`${this.path}`, validationJsonResponseMiddleware(CreateMessageDto), this.messagesController.createMessage);
    //this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    //this.router.put(`${this.path}/:id`, validationMiddleware(CreateMessageDto, true), this.usersController.updateUser);
    //this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default MessagesRoute;
