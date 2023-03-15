import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';

function validateValues(user: object): [boolean, string | null] {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (value.length < 3) {
      return [false, property];
    }
  }
  return [true, null];
}

function validateLevel(user: object): [boolean, string | null] {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (value <= 0) {
      return [false, property];
    }
  }
  return [true, null];
}

function validatePassword(user: object): [boolean, string | null] {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (value.length < 8) {
      return [false, property];
    }
  }
  return [true, null];
}

export default function validateNewUserInputs(req: Request, res: Response, next: NextFunction) {
  const user = req.body;
  const { username, vocation, level, password } = user;

  let [valid, property] = validateValues({ username, vocation });

  if (!valid) {
    return res.status(statusCodes.INVALID_VALUE)
      .json({ message: `"${property}" length must be at least 3 characters long` });
  }

  [valid, property] = validateLevel({ level });

  if (!valid) {
    return res.status(statusCodes.INVALID_VALUE)
      .json({ message: `"${property}" must be greater than or equal to 1` });
  }

  [valid, property] = validatePassword({ password });

  if (!valid) {
    return res.status(statusCodes.INVALID_VALUE)
      .json({ message: `"${property}" length must be at least 8 characters long` });
  }

  next();
}
