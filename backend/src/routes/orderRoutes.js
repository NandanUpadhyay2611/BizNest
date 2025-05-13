import { Router } from 'express';
import { orderController } from '../controllers/orderController.js';
import Order from '../models/Order.js';
const router = Router();

// POST /api/orders
router.post('/',orderController);

router.get('/total-sales', async (req, res) => {
  const result = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$amount" } } }
  ]);
  res.json({ totalSales: result[0]?.totalSales || 0 });
});

export default router;
