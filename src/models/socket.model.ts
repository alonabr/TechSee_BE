
import mongoose from 'mongoose';
import { SocketIO } from '../interfaces/socket.interface';


const socketSchema = new mongoose.Schema({
  username: String,
  socketId: String
});

const socketModel = mongoose.model<SocketIO & mongoose.Document>('Socket', socketSchema);

export default socketModel;