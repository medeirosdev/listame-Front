import Axios from 'axios';
import { env } from '~/app/env';
import { createSerializedApiErrorInterceptor } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';

export const guestApi = Axios.create({
  baseURL:  'https://0ed1-2804-14c-4e0-8290-85d7-bc3a-61bf-99a2.ngrok-free.app',
});

guestApi.interceptors.response.use(
  undefined,
  createSerializedApiErrorInterceptor,
);
