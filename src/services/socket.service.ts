
import HttpException from "../exceptions/HttpException";
import { SocketUser } from "../interfaces/socket.interface";
import socketModel from "../models/socket.model";

export class SocketService {
  public socketData = socketModel;

  public constructor(private logger: any) {
  }

  public async AddSocketUser(socket: SocketUser) {
    this.logger.info('SocketService::AddSocketUser Start ', socket.username, ' ', new Date().toJSON());
    const users: SocketUser[] = await this.socketData.find({ username: socket.username });
    if(users.length > 0) {
      this.logger.console.warn('SocketService::AddSocketUser user ', socket.username, ' already exist ', new Date().toJSON());
    } else {
      const createdSocket: SocketUser = await this.socketData.create(socket);
      if (createdSocket == null) {
        this.logger.console.error('SocketService::AddSocketUser failed to create soket', socket.username, ' ', new Date().toJSON());
      }
    }
    this.logger.info('SocketService::AddSocketUser ', socket.username, ' was added', new Date().toJSON());
  }

  public async findAllSocketUsers() {
    this.logger.info('SocketService::findAllSocketUsers Start ', new Date().toJSON());
    const socketUsers: SocketUser[] = await this.socketData.find();
    return socketUsers.map(socketUser => socketUser.username);
  }

  public async DeteleSocketUser(id: string) {
    try {
      const filter = {  id  }
    const deletedUser: any = await this.socketData.deleteOne(filter);
    if(!deletedUser.acknowledged || deletedUser.deletedCount === 0) {
      this.logger.warn('SocketService::DeteleSocketUser not found socket ', id, ' ', new Date().toJSON());
    }
    this.logger.info('SocketService::DeteleSocketUser user ', id, ' deleted ', new Date().toJSON());
    } catch(err)  {
      throw new HttpException(500, `Not Found socket to delete: ${id}`);
    }
  }
}