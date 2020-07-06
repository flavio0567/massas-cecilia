import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '../../../config/upload';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(
  cors({
    origin: process.env.APP_WEB_URL
  })
);
app.use('/files', express.static(uploadConfig.directory));
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: err.message
  });
});
app.listen(3333, () => {
  console.log('🍝 Massas Server started on port 3333!');
});
