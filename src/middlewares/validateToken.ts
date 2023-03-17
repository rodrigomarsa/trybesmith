import { Request, Response, NextFunction } from 'express';
import authFunctions from '../auth/authFunctions';

import statusCodes from '../utils/statusCodes';

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    const payload = authFunctions.verifyToken(token);
    req.body.user = payload;
    next();
  } catch (error) {
    return res.status(statusCodes.UNAUTHORIZED).json({
      message: 'Invalid token',
    });
  }
}