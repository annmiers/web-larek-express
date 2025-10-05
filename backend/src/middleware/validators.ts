import { celebrate, Joi, Segments } from 'celebrate';

export const validateCreateProduct = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
        'any.required': 'Поле "title" должно быть заполнено',
      }),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    })
      .required()
      .messages({
        'any.required': 'Поле "image" обязательно',
      }),
    category: Joi.string().required().messages({
      'any.required': 'Поле "category" обязательно',
    }),
    description: Joi.string().optional(),
    price: Joi.alternatives()
      .try(Joi.number().min(0), Joi.valid(null))
      .optional(),
  }),
});

export const validateCreateOrder = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string()
      .valid('card', 'online')
      .required()
      .messages({
        'any.only': 'payment должен быть "card" или "online"',
        'any.required': 'Поле payment обязательно',
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Некорректный email',
        'any.required': 'Поле email обязательно',
      }),
    phone: Joi.string()
      .pattern(/^\+?[\d\s\-\(\)]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Некорректный формат телефона',
        'any.required': 'Поле phone обязательно',
      }),
    address: Joi.string()
      .min(1)
      .required()
      .messages({
        'string.min': 'Адрес не может быть пустым',
        'any.required': 'Поле address обязательно',
      }),
    total: Joi.number()
      .integer()
      .min(0)
      .required()
      .messages({
        'number.min': 'Сумма должна быть положительной',
        'any.required': 'Поле total обязательно',
      }),
    items: Joi.array()
      .items(Joi.string().hex().length(24))
      .min(1)
      .required()
      .messages({
        'array.min': 'Нужен хотя бы один товар',
        'any.required': 'Поле items обязательно',
        'string.hex': 'ID товара должен быть валидным ObjectId',
      }),
  }),
});