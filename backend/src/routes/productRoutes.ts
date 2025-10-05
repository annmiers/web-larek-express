import { Router } from 'express';
import { validateCreateProduct } from '../middleware/validators';
import { getAllProducts, createProduct } from '../controllers/productController';

const router = Router();

router.get('/', getAllProducts);
router.post('/', validateCreateProduct, createProduct);

export default router;
