import { IUser } from '../user';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
