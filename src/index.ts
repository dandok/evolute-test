import 'reflect-metadata';
import { connectToDatabase } from './database';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './inversify.config';
import cors from 'cors';
import dotenv from 'dotenv';
import { globalErrorHandler } from './middlewares/error-handler';

dotenv.config();

const start = async () => {
  const app = express();
  const server = new InversifyExpressServer(container, null, null, app);

  process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', err);
  });

  server.setConfig((app) => {
    app.use(express.json());
    app.use(cors());
  });
  app.use(globalErrorHandler);

  const serverInstance = server.build();
  const PORT = process.env.PORT || 5002;

  serverInstance.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Listening on port: ${PORT}`);
  });
};

start();
