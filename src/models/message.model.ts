
import mongoose from 'mongoose';
import { Message } from '../interfaces/message.interface';


const messageSchema = new mongoose.Schema({
  message: String,
  username: String,
  date: String,
  userId: String,
});

const messageModel = mongoose.model<Message & mongoose.Document>('Message', messageSchema);

export default messageModel;