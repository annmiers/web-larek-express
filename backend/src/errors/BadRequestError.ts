import HttpError from './HttpError';

class BadRequestError extends HttpError {
  constructor(message: string = 'Некорректные данные запроса') {
    super(400, message);
  }
}

export default BadRequestError;
