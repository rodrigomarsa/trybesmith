import { Request, Response, NextFunction } from 'express';
import statusCodes from '../utils/statusCodes';

export default function validateProductAmount(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { amount } = req.body;
  if (!amount) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: '"amount" is required' });
  }
  if (typeof amount !== 'string') {
    return res.status(statusCodes.INVALID_VALUE).json({ message: '"amount" must be a string' });
  }
  if (amount.length < 3) {
    return res.status(statusCodes.INVALID_VALUE)
      .json({ message: '"amount" length must be at least 3 characters long' });
  }
  next();
}