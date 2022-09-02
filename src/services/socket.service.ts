
import HttpException from "../exceptions/HttpException";
import { SocketIO } from "../interfaces/socket.interface";
import socketModel from "../models/socket.model";

export class SocketService {
  public socketData = socketModel;

  public async AddSocketUser(socket: SocketIO) {
    const users: SocketIO[] = await this.socketData.find({ username: socket.username });
    if(users.length > 0) {
      console.log("user already exist");
    } else {
      const createdSocket: SocketIO = await this.socketData.create(socket);
      if (createdSocket == null) {
        throw new HttpException(500, `Failed to save message: ${socket}`);
      }
    }
  }

  public async findAllSocketUsers() {
    const socketUsers: SocketIO[] = await this.socketData.find();
    return socketUsers.map(socketUser => socketUser.username);
  }

  public async DeteleSocketUser(username: string) {
    const filter = {  username  }
    const deletedUser: any = await this.socketData.deleteOne(filter);
    if(!deletedUser.acknowledged || deletedUser.deletedCount === 0) {
      throw new HttpException(500, `Failed to delete: ${username}`);
    }
  }
}