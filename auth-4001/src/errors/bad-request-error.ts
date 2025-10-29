import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCodes = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
