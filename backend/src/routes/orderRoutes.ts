import { Router } from 'express';
import { createOrder } from '../controllers/orderController';
import { validateCreateOrder } from '../middleware/validators';

const router = Router();

router.post('/', validateCreateOrder, createOrder);

export default router;