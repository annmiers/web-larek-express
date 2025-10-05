import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  constructor(message: string = 'Маршрут не найден') {
    super(404, message);
  }
}