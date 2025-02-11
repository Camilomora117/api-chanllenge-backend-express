import mongoose from 'mongoose';
import { environments } from './config';
import { logger } from '../utils/data/logger';

const connectDB = async () => {
  try {
    await mongoose.connect(environments.MONGO_URI as string);
    logger.info('✅ MongoDB Atlas Connected');
  } catch (error) {
    logger.error(`❌ MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
