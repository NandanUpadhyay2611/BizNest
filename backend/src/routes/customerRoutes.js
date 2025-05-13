import { customerController } from '../controllers/customersController.js';
import { Router } from 'express';
import Customer from '../models/Customer.js';

const router = Router();


// POST /api/customers
router.post('/', customerController);

router.get('/total', async (req, res) => {
  const total = await Customer.countDocuments();
  res.json({ total });
});

export default router;
