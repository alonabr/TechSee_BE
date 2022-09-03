import { createSimpleLogger } from "simple-node-logger";
import { SocketUser } from "../interfaces/socket.interface";
import socketModel from "../models/socket.model"
import { SocketService } from "../services/socket.service"

const log = createSimpleLogger();
const socketService = new SocketService(log);
const mock = <SocketUser>{ username: 'test-1', id: 'test-id'}

it("login", async() => {
  const spySocketData = jest.spyOn(socketModel.prototype, 'create').mockImplementation(() => {Promise.resolve({})})
  const result = await socketService.AddSocketUser(mock)
  expect(result).not.toThrow()
})