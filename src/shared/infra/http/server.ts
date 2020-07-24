import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import AppError from '@shared/errors/AppError';
import rateLimiter from '../http/middleware/rateLimiter';
import uploadConfig from '../../../config/upload';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.APP_WEB_URL);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
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
