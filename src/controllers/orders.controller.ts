import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import OrderService from '../services/orders.service';

export default class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.orderService.getAll();
    return res.status(statusCodes.OK).json(products);
  };
}
