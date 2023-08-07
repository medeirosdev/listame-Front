import { IUser } from '../user';

export interface ICreateUserRequest {
  name: string;
  email: string;
  login: string;
  password: string;
}

export interface ICreateUserResponse extends IUser {}
