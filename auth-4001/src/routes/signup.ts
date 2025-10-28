import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const signUpRouter = Router();

signUpRouter.post(
  '/api/users/signup',
  [
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email must be valid'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    // throw new DatabaseConnectionError();

    res.send('signup route');
  }
);
