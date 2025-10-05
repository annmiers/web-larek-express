import HttpError from './HttpError';

class NotFoundError extends HttpError {
  constructor(message: string = 'Маршрут не найден') {
    super(404, message);
  }
}

export default NotFoundError;
