import 'module-alias/register';
import app from './app';
import dotenv from 'dotenv';
import { logger } from '@/utils/logger';
import { connectDB } from './config';

dotenv.config();

const PORT = process.env.PORT || 4000;

export default async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
