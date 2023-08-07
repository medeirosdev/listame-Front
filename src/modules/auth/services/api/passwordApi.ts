import { api } from '~/app/services/api/api';
import { IForgotPasswordRequest } from '~/modules/auth/types/api/password';

interface IForgot {
  (forgotPasswordData: IForgotPasswordRequest): Promise<{}>;
}

const BASE_URL = '/password';

const forgot: IForgot = async (forgotPasswordData) => {
  const endpoint = BASE_URL.concat('/forgot');
  const { data } = await api.post(endpoint, forgotPasswordData);
  return data;
};

export const passwordApi = {
  forgot,
};
