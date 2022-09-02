import App from "./app";
import IndexRoute from "./routes/index.route";
import MessagesRoute from "./routes/messages.route";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([
  new IndexRoute(),
  new MessagesRoute(),
]);

app.listen();