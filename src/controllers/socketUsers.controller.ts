import { NextFunction, Request, Response } from "express";
import { SocketService } from "../services/socket.service";

export class SocketUsersController {
  public readonly messageService = new SocketService(this.log);

  constructor(private log: any){
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: String[] = await this.messageService.findAllSocketUsers();
      res.status(200).json({ data: users });
    } catch(error) {
      next(error);
    }
  }
}