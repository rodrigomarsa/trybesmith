import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import ProductService from '../services/products.service';

class ProductsController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    return res.status(statusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const productCreated = await this.productService.create(product);
    return res.status(statusCodes.CREATED).json(productCreated);
  };
}

export default ProductsController;