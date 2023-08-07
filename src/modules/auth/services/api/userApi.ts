import { api } from '~/app/services/api/api';

import {
  ICreateUserRequest,
  ICreateUserResponse,
} from '~/modules/auth/types/api/user';

interface ICreateUser {
  (userData: ICreateUserRequest): Promise<ICreateUserResponse>;
}

const BASE_URL = '/users';

const createUser: ICreateUser = async (userData) => {
  const endpoint = BASE_URL.concat('/');
  const { data } = await api.post(endpoint, userData);
  return data;
};

export const userApi = {
  createUser,
};
