import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '@/utils/logger';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI!;
  try {
    await mongoose.connect(uri);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('MongoDB connection error', err);
    throw err;
  }
};
