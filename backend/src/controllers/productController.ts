import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';
import InternalServerError from '../errors/InternalServerError';

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      items: products,
      total: products.length,
    });
  } catch (error) {
    next(new InternalServerError('Не удалось получить товары'));
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    const newProduct = new Product({
      title,
      image,
      category,
      description,
      price: price === null ? null : price,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message).join('; ');
      return next(new BadRequestError(`Ошибка валидации: ${messages}`));
    }

    return next(new InternalServerError());
  }
};
