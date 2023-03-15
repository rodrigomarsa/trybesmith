import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import validateProductAmount from '../middlewares/validateProductAmount';
import validateProductName from '../middlewares/validateProductName';

const router = Router();

const productsController = new ProductsController();

router.route('/products')
  .get(productsController.getAll)
  .post(validateProductName, validateProductAmount, productsController.create);

export default router;