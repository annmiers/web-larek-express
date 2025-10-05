import { HttpError } from './HttpError';

export class ConflictError extends HttpError {
  constructor(message: string = 'Конфликт при создании ресурса') {
    super(409, message);
  }
}