import { guestApi } from '~/app/services/api/guest';

import {
  ILoginRequest,
  ILoginResponse,
} from '~/modules/auth/types/api/session';

interface ILogin {
  (credentials: ILoginRequest): Promise<ILoginResponse>;
}

interface ILoginWithGoogle {
  (token: string): Promise<ILoginResponse>;
}

interface ILoginWithFacebook {
  (token: string): Promise<ILoginResponse>;
}

const BASE_URL = '/sessions';

const login: ILogin = async (credentials) => {
  const endpoint = BASE_URL.concat('/');
  const { data } = await guestApi.post(endpoint, credentials);
  return data;
};

const checkTokenValid = async (token: string) => {
  const endpoint = BASE_URL.concat('/valid');
  const { data } = await guestApi.post(endpoint, { token });
  return data;
};

const loginWithGoogle: ILoginWithGoogle = async (token) => {
  const endpoint = BASE_URL.concat('/google');
  const { data } = await guestApi.post(endpoint, { token });
  return data;
};

const loginWithFacebook: ILoginWithFacebook = async (token) => {
  const endpoint = BASE_URL.concat('/facebook');
  const { data } = await guestApi.post(endpoint, { token });
  return data;
};

export const sessionApi = {
  login,
  checkTokenValid,
  loginWithGoogle,
  loginWithFacebook,
};
