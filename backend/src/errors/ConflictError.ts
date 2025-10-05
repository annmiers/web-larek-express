import HttpError from './HttpError';

class ConflictError extends HttpError {
  constructor(message: string = 'Конфликт при создании ресурса') {
    super(409, message);
  }
}

export default ConflictError;
