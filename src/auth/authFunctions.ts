import jwt, { SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'password';

const JWT_CONFIG: SignOptions = {
  algorithm: 'HS256',
};

const createToken = (data: string | object) => jwt.sign({ data }, secret, JWT_CONFIG);

const verifyToken = (token: string) => jwt.verify(token, secret);

const authFunctions = { createToken, verifyToken };

export default authFunctions;