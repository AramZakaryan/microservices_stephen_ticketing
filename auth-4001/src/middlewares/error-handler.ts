// middleware/error-handler.ts

import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    const { statusCodes } = err;
    const serializedErrors = err.serializeErrors();
    return res.status(statusCodes).send({ errors: serializedErrors });
  }
  res.status(400).send({ message: 'Something went wrong' });
};
