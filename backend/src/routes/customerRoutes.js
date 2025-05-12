
import { customerController } from '../controllers/customersController.js';
import { Router } from 'express';

const router = Router();


// POST /api/customers
router.post('/', customerController);

export default router;
