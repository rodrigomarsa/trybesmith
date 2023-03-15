import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IUser, ILogin } from '../interfaces';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: IUser): Promise<IUser> {
    const { username, vocation, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?)',
      [username, vocation, level, password],
    );
    return { id: insertId, ...user };
  }

  public async getByUsername(login: ILogin): Promise<IUser[]> {
    const { username } = login;
    const [rows] = await this.connection.execute<RowDataPacket[] & IUser[]>(
      'SELECT * FROM Trybesmith.users WHERE username = ?',
      [username],
    );
    return rows;
  }
}