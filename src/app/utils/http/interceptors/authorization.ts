import { AxiosRequestConfig } from 'axios';
import { getTokenFromSafeStorage } from '~/modules/auth/services/storage/safeStorage';

export async function addAuthorizationHeaderInterceptor(
  config: AxiosRequestConfig,
) {
  const token = await getTokenFromSafeStorage();
  if (!token) {
    return config;
  }

  config.headers = Object.assign(config.headers || {}, {
    Authorization: 'Bearer '.concat(token),
  });

  return config;
}
