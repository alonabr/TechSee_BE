// import express from 'express';
// const router = express.Router();
// import { MessagesController } from '../controllers/messages'; 

// const messageController = new MessagesController();

// router.get('/messages', messageController.getUsers);

// export default router;

import { Router } from 'express';
import MessagesController from '../controllers/messages.controller';
//import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
//import validationMiddleware from '../middlewares/validation.middleware';
//import validationJsonResponseMiddleware from '../middlewares/validationJsonResponse.middleware';

class MessagesRoute implements Route {
  public path = '/messages';
  public router = Router();
  public usersController = new MessagesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    //this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    //this.router.post(`${this.path}`, validationJsonResponseMiddleware(CreateUserDto), this.usersController.createUser);
    //this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.usersController.updateUser);
    //this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default MessagesRoute;
