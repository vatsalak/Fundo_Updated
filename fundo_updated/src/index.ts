import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.route'; 
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

//simport routes from './routes/index'; 
// Import main routes if applicable
import noteRoutes from './routes/note.route'; // Import the note routes
import Database from './config/database';
import ErrorHandler from './middlewares/error.middleware';
import Logger from './config/logger';

class App {
  public app: Application;
  public host: string | number;
  public port: string | number;
  public api_version: string | number;
  public env: boolean;
  private db = new Database();
  private logStream = Logger.logStream;
  private logger = Logger.logger;
  public errorHandler = new ErrorHandler();

  constructor() {
    this.app = express();
    this.host = process.env.APP_HOST || 'localhost'; // Default value
    this.port = process.env.APP_PORT || 5000; // Default value
    this.api_version = process.env.API_VERSION || 'v1'; // Default value

    this.initializeMiddleWares();
    this.initializeRoutes(); // This will call the routes including note routes
    this.initializeDatabase();
    this.initializeErrorHandlers();
    this.startApp();
    this.env = process.env.NODE_ENV === 'production'; 
  }

  public initializeMiddleWares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  public initializeDatabase(): void {
    this.db.initializeDatabase();
  }

  public initializeRoutes(): void {
    // You can define your main routes here, including note routes
    //te routes here
    // If you have other routes to add, you can add them similarly
    // this.app.use(`/api/${this.api_version}`, routes); 
    this.app.use('/api/v1', userRoutes);
    this.app.use(`/api/${this.api_version}/notes`, noteRoutes);
    

  }

  public initializeErrorHandlers(): void {
    this.app.use(this.errorHandler.appErrorHandler);
    this.app.use(this.errorHandler.genericErrorHandler);
    this.app.use(this.errorHandler.notFound);
  }

  public startApp(): void {
    this.app.listen(this.port, () => {
      this.logger.info(
        `Server started at ${this.host}:${this.port}/api/${this.api_version}/`
      );
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

const app = new App();

export default app;
