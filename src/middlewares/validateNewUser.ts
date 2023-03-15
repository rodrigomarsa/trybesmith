import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';

const properties = ['username', 'vocation', 'level', 'password'];

function validateProperties(user: object): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateTypeOfString(user: object): [boolean, string | null] {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (typeof value !== 'string') {
      return [false, property];
    }
  }
  return [true, null];
}

function validateTypeOfNumber(user: object): [boolean, string | null] {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (typeof value !== 'number') {
      return [false, property];
    }
  }
  return [true, null];
}

export default function validateNewUser(req: Request, res: Response, next: NextFunction) {
  const user = req.body;
  const { username, vocation, level, password } = user;

  let [valid, property] = validateProperties(user);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: `"${property}" is required` });
  }

  [valid, property] = validateTypeOfString({ username, vocation, password });

  if (!valid) {
    return res.status(statusCodes.INVALID_VALUE)
      .json({ message: `"${property}" must be a string` });
  }

  [valid, property] = validateTypeOfNumber({ level });

  if (!valid) {
    return res.status(statusCodes.INVALID_VALUE)
      .json({ message: `"${property}" must be a number` });
  }

  next();
}
