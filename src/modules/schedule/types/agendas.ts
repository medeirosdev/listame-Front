import { IUser } from '~/modules/auth/types/user';

export enum UserAgendaRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  MAINTAINER = 'maintainer',
  FOLLOWER = 'follower',
}

export interface IAgenda {
  id: string;
  name: string;
  description: string;
  avatar: null;
  is_private: boolean;
  members: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  avatar_url: null;
  user: IUser;
  role?: UserAgendaRole;
}

export interface IUserAgenda {
  id: string;
  user_id: string;
  agenda_id: string;
  created_at: string;
  updated_at: string;
}

export const isAgenda = (instance: any): instance is IAgenda =>
  'members' in instance;

export interface ICreateAgendaDTO {
  name: string;
  description: string;
  isPrivate: boolean;
}
