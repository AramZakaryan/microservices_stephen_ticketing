import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCodes = 404;
  reason = 'route not found';
  constructor() {
    super('Not found error');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
