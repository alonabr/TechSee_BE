import { createSimpleLogger } from "simple-node-logger";
import App from "./app";
import IndexRoute from "./routes/index.route";
import MessagesRoute from "./routes/messages.route";
import { SocketUsersRoute } from "./routes/socketUsers.route";
import { SocketUtil } from "./utils/socket";
import validateEnv from "./utils/validateEnv";

validateEnv();

// const app = new App([
//   new IndexRoute(),
//   new SocketUsersRoute(),
//   new MessagesRoute(),
// ]);

// app.listen();

 const log = createSimpleLogger();
 const socket = new SocketUtil(log);
 socket.listen();
