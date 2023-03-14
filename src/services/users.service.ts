import connection from '../models/connection';
import UserModel from '../models/user.model';
import { IUser } from '../interfaces';
import authFunctions from '../auth/authFunctions';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: IUser): Promise<string> {
    const { username } = user;
    await this.model.create(user);
    const token = authFunctions.createToken(username);
    return token;
  }
}