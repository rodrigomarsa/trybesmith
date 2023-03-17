import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import OrderService from '../services/orders.service';

export default class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    return res.status(statusCodes.OK).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const order = req.body;
    const { type, message } = await this.orderService.create(order);
    if (type) return res.status(statusCodes.UNAUTHORIZED).json({ message });
    return res.status(statusCodes.CREATED).json(message);
  };
}
