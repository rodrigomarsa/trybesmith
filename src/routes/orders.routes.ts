import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import validateOrder from '../middlewares/validateOrder';
import validateToken from '../middlewares/validateToken';

const router = Router();

const ordersController = new OrdersController();

router.route('/orders')
  .get(ordersController.getAll)
  .post(validateToken, validateOrder, ordersController.create);

export default router;