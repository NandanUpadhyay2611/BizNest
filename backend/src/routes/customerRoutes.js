

import { customerController } from '../controllers/customersController.js';
import router from './orderRoutes.js';


// POST /api/customers
router.post('/', customerController);

export default router;
