import { Request, Response, NextFunction } from 'express';
import statusCodes from '../utils/statusCodes';

export default function validateProductName(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name } = req.body;
  if (!name) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: '"name" is required' });
  }
  if (typeof name !== 'string') {
    return res.status(statusCodes.INVALID_VALUE).json({ message: '"name" must be a string' });
  }
  if (name.length < 2) {
    return res.status(statusCodes.INVALID_VALUE)
      .json({ message: '"name" length must be at least 3 characters long' });
  }
  next();
}