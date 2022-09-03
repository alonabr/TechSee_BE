
import mongoose from 'mongoose';
import { SocketUser } from '../interfaces/socket.interface';


const socketSchema = new mongoose.Schema({
  username: String,
  id: String
});

const socketModel = mongoose.model<SocketUser & mongoose.Document>('Socket', socketSchema);

export default socketModel;