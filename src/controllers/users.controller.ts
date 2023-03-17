import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import UserService from '../services/users.service';
import authFunctions from '../auth/authFunctions';

export default class UsersController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const { username } = user;
    await this.userService.create(user);
    const token = authFunctions.createToken(username);
    return res.status(statusCodes.CREATED).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const login = req.body;
    const { type, message } = await this.userService.login(login);
    if (type) return res.status(statusCodes.UNAUTHORIZED).json({ message });
    return res.status(statusCodes.OK).json({ token: message });
  };
}
