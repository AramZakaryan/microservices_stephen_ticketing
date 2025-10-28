import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCodes = 500;
  reason = 'database connection error';
  constructor() {
    super('Database connection error');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
