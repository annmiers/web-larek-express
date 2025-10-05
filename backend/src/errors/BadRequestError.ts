import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
  constructor(message: string = 'Некорректные данные запроса') {
    super(400, message);
  }
}