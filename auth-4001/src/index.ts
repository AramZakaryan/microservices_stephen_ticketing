// src/index.ts

import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { meRouter } from './routes/me';
import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());

app.use(meRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.get('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const port = 4001;

const startApp = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-cluster-ip-srv:27017/auth');
    console.log(`Auth service connected to MongoDB`);
  } catch (error) {
    console.error(error);
  }

  app.listen(port, async () => {
    console.log(`Auth service is running on port ${port}`);
  });
};

startApp();
