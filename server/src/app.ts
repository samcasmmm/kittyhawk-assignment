import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import todosRoutes from '@/routes/todos.routes';
import morgan from 'morgan';
import authRoutes from '@/routes/auth.routes';
import ResponseBuilderMiddleware from './middleware/response.middleware';
import { errorHandler, notFound } from './middleware/error.middleware';
dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(ResponseBuilderMiddleware);

const corsOrigin = process.env.CORS_ORIGIN ?? '*';
app.use(cors({ origin: corsOrigin }));

app.get('/', (req, res) =>
  res.build.withStatus(200).withMessage('OK').withData(null).send()
);

app.use('/api/auth', authRoutes);
app.use('/api/todos', todosRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
