import { Router } from 'express';
import { orderController } from '../controllers/orderController.js';
const router = Router();

// POST /api/orders
router.post('/',orderController);

export default router;
