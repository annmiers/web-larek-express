import { HttpError } from './HttpError';

export class InternalServerError extends HttpError {
  constructor(message: string = 'Внутренняя ошибка сервера') {
    super(500, message);
  }
}