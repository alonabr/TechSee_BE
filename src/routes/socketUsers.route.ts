import { Router } from 'express';
import { SocketUsersController } from '../controllers/socketUsers.controller';
import Route from '../interfaces/routes.interface';

export class SocketUsersRoute implements Route {
  public path = '/socket/';
  public router = Router();
  public socketUsersController = new SocketUsersController(this.log);

  constructor(private log:any) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.socketUsersController.getUsers);
  }
}