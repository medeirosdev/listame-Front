export type IUserType = 'DEFAULT' | 'ADMIN' | 'GUEST';

export interface IUser {
  name: string;
  email: string;
  login: string;
  status: string;
  type: IUserType;
  id: string;
  created_at: string;
  updated_at: string;
  avatar_url: null;
}

export const isUser = (instance: any): instance is IUser => 'email' in instance;
