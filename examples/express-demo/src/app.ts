import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import 'express-async-errors';

import { errorHandler } from '@apps/middlewares/error.handler';
import { sendSuccess } from '@apps/shared/utils/response';

// Import Routers
import userRouter from '@apps/modules/users/users.router';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  return sendSuccess(res, { status: 'OK' }, 'Health check passed');
});

// Mount Routes
app.use('/users', userRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
