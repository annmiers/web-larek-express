import path from 'path';
import { errors } from 'celebrate';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import errorHandler from './middleware/errorHandler';
import { requestLogger, errorLogger } from './middleware/logger';

const app = express();

mongoose.connect(config.mongodb.url)
  .then(() => {
    console.log('Подключено к MongoDB');
  })
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(express.static(path.join(__dirname, './public')));

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use((_req, res, _next) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use(errors());

app.use(errorLogger);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`Сервер запущен на http://localhost:${config.port}`);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  server.close(() => {
    console.log('Сервер остановлен');
    process.exit(0);
  });
});
