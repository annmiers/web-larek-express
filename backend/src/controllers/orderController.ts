import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import validator from 'validator';
import Product from '../models/Product';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalServerError } from '../errors/InternalServerError';
import { NotFoundError } from '../errors/NotFoundError';

interface IOrderInput {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { payment, email, phone, address, total, items }: IOrderInput = req.body;

    if (!payment || !email || !phone || !address || total === undefined || !items) {
      return next(new BadRequestError('Все поля обязательны'));
    }

    if (payment !== 'card' && payment !== 'online') {
      return next(new BadRequestError('payment должен быть "card" или "online"'));
    }

    if (!validator.isEmail(email)) {
      return next(new BadRequestError('Некорректный email'));
    }

    if (typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10) {
      return next(new BadRequestError('Некорректный номер телефона'));
    }

    if (typeof address !== 'string' || address.trim().length === 0) {
      return next(new BadRequestError('Адрес не может быть пустым'));
    }

    if (typeof total !== 'number' || total < 0 || !Number.isInteger(total)) {
      return next(new BadRequestError('total должен быть неотрицательным числом'));
    }

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('items должен быть непустым массивом'));
    }

    const uniqueItemIds = [...new Set(items)];

    const products = await Product.find({ _id: { $in: uniqueItemIds } });

    if (products.length !== uniqueItemIds.length) {
      const foundIds = products.map(p => p.id);
      const missing = uniqueItemIds.filter(id => !foundIds.includes(id));
      return next(new NotFoundError(`Товары не найдены: ${missing.join(', ')}`));
    }

    const calculatedTotal = products.reduce((sum, p) => sum + (p.price || 0), 0);
    if (calculatedTotal !== total) {
      return next(new BadRequestError(`Несоответствие суммы: ожидается ${calculatedTotal}, получено ${total}`));
    }

    const orderId = faker.string.uuid();
    res.status(200).json({
      id: orderId,
      total: calculatedTotal,
    });

  } catch (error) {
    next(new InternalServerError('Ошибка при создании заказа'));
  }
};