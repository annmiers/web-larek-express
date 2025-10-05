import HttpError from './HttpError';

class InternalServerError extends HttpError {
  constructor(message: string = 'Внутренняя ошибка сервера') {
    super(500, message);
  }
}

export default InternalServerError;
