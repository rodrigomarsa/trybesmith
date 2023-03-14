import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import UserService from '../services/users.service';

export default class UsersController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    
    const token = await this.userService.create(user);
    return res.status(statusCodes.CREATED).json({ token });
  };
}
