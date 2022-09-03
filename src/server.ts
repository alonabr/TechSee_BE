import { createSimpleLogger } from "simple-node-logger";
import App from "./app";
import IndexRoute from "./routes/index.route";
import MessagesRoute from "./routes/messages.route";
import { SocketUsersRoute } from "./routes/socketUsers.route";
import { SocketUtil } from "./utils/socket";
import validateEnv from "./utils/validateEnv";

validateEnv();
const log = createSimpleLogger();

if(process.env.IS_MESSAGE_SERVER) {
   const app = new App([
   new IndexRoute(),
   new SocketUsersRoute(log),
   new MessagesRoute(log),
  ]);
  app.listen();
} else {
  const socket = new SocketUtil(log);
 socket.listen();
}

 
