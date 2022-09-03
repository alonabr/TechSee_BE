import { Server } from 'socket.io'
import { createServer } from 'http'
import express, { json, urlencoded } from 'express';
import { SocketService } from '../services/socket.service';
import { SocketUser } from '../interfaces/socket.interface';
import { CreateMessageDto } from '../dtos/message.dto';
import { MessageService } from '../services/messages.service';
import { Message } from '../interfaces/message.interface';
import mongoose from 'mongoose';



export class SocketUtil {
  
  public readonly socketService = new SocketService(this.logger);
  public readonly messageService = new MessageService(this.logger);
  public app: express.Application;
  public port: (string | number);

  constructor(private logger: any) {
    this.connectToDatabase();
    this.app = express();
    this.port = 3000;
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }))
  }

  public listen() {
    const server = createServer(this.app);
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:8080',
      },
    });

    io.on('connection', (socket: any) => {

      socket.username = 'Anonymous';

      socket.on('enterUsername', async (user: SocketUser) => {
        this.logger.info('SocketUtil::enterUsername Start ', socket.username, ' ', new Date().toJSON());
        socket.username = user.username
        const newSocket = { username: user.username, id: socket.id } as SocketUser;
        await this.socketService.AddSocketUser(newSocket)
        io.emit('userLoggedIn', socket.username)
        this.logger.info('SocketUtil::enterUsername ', socket.username, ' user connected', new Date().toJSON());
      })

      socket.on('newMessage', async (data: any) => {
        this.logger.info('SocketUtil::newMessage Start ', data, new Date().toJSON());
        let message = new CreateMessageDto({
          message: data.message,
          username: data.username,
          date:  new Date().toDateString(),
          userId: socket.id,
        })        
        const messageRes: Message = await this.messageService.createMessage(message);
        io.emit('newMessage', message)
      })

      socket.on('disconnect', async () => {
        await this.socketService.DeteleSocketUser(socket.id);
        io.emit('userDisconnected', socket.username)
      })

      socket.on('getUsers', async () => {
        this.logger.info('SocketUtil::getUsers Start ', new Date().toJSON());
        const users: String[] = await this.socketService.findAllSocketUsers();
        this.logger.info('SocketUtil::getUsers ', users, new Date().toJSON());
        io.emit('getUsers', users )
      })

      socket.on('getMessages', async () => {
        this.logger.info('SocketUtil::getMessages Start ', new Date().toJSON());
        const messages: Message[] = await this.messageService.findAllMessages();
        this.logger.info('SocketUtil::getMessages ', messages, new Date().toJSON());
        io.emit('getMessages', messages)
      })

    })

    server.listen(this.port, () => {
      console.log(`App listening at http://localhost:${this.port}`)
    })
  }

  private connectToDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_CONNECTION_VERB } = process.env;
    const options = {
        //useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //serverApi: ServerApiVersion.v1
        //useFindAndModify: false,
      };

    mongoose.connect("mongodb+srv://alonabr:1a2s3d4f@cluster0.37zodn4.mongodb.net/messages?retryWrites=true&w=majority");
  }
}