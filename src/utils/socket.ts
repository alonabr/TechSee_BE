import { Server } from 'socket.io'
import { createServer } from 'http'
import { json, urlencoded } from 'express';
import { SocketService } from '../services/socket.service';
import { SocketIO } from '../interfaces/socket.interface';
import { CreateMessageDto } from '../dtos/message.dto';
import dateFormat from "dateformat";
import { MessageService } from '../services/messages.service';
import { Message } from '../interfaces/message.interface';

export class SocketUtil {

  public readonly socketService = new SocketService();
  public readonly messageService = new MessageService();


  constructor(app: any) {
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:8080',
        // origin: 'http://YOUR_HOST_IP:8080',
      },
    });
    app.use(json());
    app.use(urlencoded({ extended: false }))

    io.on('connection', (socket: any) => {
      
      socket.emit('initChat', {
        data: 'Chat init',
      });

      socket.username = '';

      socket.on('enterUsername', async (user: any) => {
        socket.username = user.username
        const newSocket = { username: user.username, socketId: socket.id } as SocketIO;
        await this.socketService.AddSocketUser(newSocket)
        io.emit('getUsers', await this.socketService.findAllSocketUsers())
        io.emit('userConnected', socket.username)
        console.log(`${socket.username} user connected`)
      })

      socket.on('newMessage', async (data: any) => {
        let message = new CreateMessageDto({
          message: data.message,
          username: socket.username,
          date: dateFormat(new Date(), 'dd-mm-yyyy,  HH:MM'),
          userId: socket.id,
        })        

        const messageRes: Message = await this.messageService.createMessage(message);
        io.emit('newMessage', messageRes)
      })

      socket.on('disconnect', () => {
        io.emit('userDisconnected', socket.username)
        this.socketService.DeteleSocketUser(socket.username);
      })

    })

    

    
  }
}