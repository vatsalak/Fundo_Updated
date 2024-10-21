import mongoose from 'mongoose';
import Logger from './logger';

class Database {
  public async initializeDatabase(): Promise<void> {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/register-login-db'||'mongodb://localhost:27017/note-db';
    
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      Logger.logger.info('MongoDB connected successfully');
    } catch (error) {
      Logger.logger.error('MongoDB connection failed', error);
      process.exit(1);
    }
  }
}
// config/database.ts






export default Database;
