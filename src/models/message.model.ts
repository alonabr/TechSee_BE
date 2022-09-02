
import mongoose from 'mongoose';
import { Message } from '../interfaces/message.interface';


const messageSchema = new mongoose.Schema({
  username: String,
  password: String
});

const userModel = mongoose.model<Message & mongoose.Document>('Message', messageSchema);

export default userModel;