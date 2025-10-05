import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';

const errorHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error('Необработанная ошибка:', err);
  return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};

export default errorHandler;
