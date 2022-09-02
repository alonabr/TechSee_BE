import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import logger from 'morgan';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import swaggerIgnite from './utils/swagger';

class App {
  public app: express.Application;
  public port: (string | number);
  public env: boolean;
  
  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV === 'production' ? true : false;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initSwaggerDocs();
    this.initializeRoutes(routes);   
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  public initSwaggerDocs() {
    swaggerIgnite(this.app);
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      //this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
      this.app.use(logger('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_CONNECTION_VERB } = process.env;
    const options = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      };
    //const connectionString = MONGO_CONNECTION_VERB + '://'+ MONGO_USER + ':' + MONGO_PASSWORD + MONGO_PATH
    mongoose.connect("mongodb+srv://alonabr:Alon11abr@cluster0.qpfrstd.mongodb.net", { ...options });
  }
}

export default App;