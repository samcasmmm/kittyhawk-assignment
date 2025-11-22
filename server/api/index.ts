import 'tsconfig-paths/register';
import 'module-alias/register';
import app from '../src/app';
import dotenv from 'dotenv';
import { connectDB } from '../src/config';

dotenv.config();

let dbConnected = false;

const connectDatabase = async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      throw err;
    }
  }
};

export default async (req: any, res: any) => {
  if (!dbConnected) {
    await connectDatabase();
  }
  return app(req, res);
};
