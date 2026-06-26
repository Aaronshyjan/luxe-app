import { Router } from 'express';
import { getProducts, getProductById, searchProducts, getFeaturedProducts } from '../controllers/productController';

const router = Router();

router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);
router.get('/', getProducts);

export default router;
