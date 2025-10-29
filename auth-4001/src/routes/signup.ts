import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

import { User } from '../models/user.model';
import { BadRequestError } from '../errors/bad-request-error';

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log(existingUser);
      throw new BadRequestError(`User with email ${email} already exists`);
    }

    const user = User.buildUser({ email, password });

    const savedUser = await user.save();

    if (!savedUser) {
      console.log(savedUser);
      throw new BadRequestError('Something went wrong: the user was not saved');
    }

    res.status(201).send(savedUser);
  }
);
