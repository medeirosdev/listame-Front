import Axios from 'axios';
import { env } from '~/app/env';
import { createSerializedApiErrorInterceptor } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';

export const guestApi = Axios.create({
  baseURL:  'https://9c24-2804-14c-4e0-8290-606e-6048-3f5d-2c7a.ngrok-free.app',
});

guestApi.interceptors.response.use(
  undefined,
  createSerializedApiErrorInterceptor,
);
