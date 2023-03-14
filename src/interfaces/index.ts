export interface IProduct {
  id?: number;
  name: string;
  amount: string;
}

export interface IUser {
  id?: number;
  username: string;
  vocation: string;
  level: number;
  password?: string;
}
