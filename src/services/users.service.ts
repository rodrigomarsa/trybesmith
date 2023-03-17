import connection from '../models/connection';
import UserModel from '../models/user.model';
import { ILogin, IUser } from '../interfaces';
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

  public async login(login: ILogin) {
    const user = await this.model.getByUsername(login);
    if (!user[0] || user[0].password !== login.password) {
      return { type: 'INVALID_VALUES', message: 'Username or password invalid' };
    }
    const [{ id, username }] = user;
    const token = authFunctions.createToken({ id, username });
    return { type: null, message: token };
  }
}