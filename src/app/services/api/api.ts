import Axios from 'axios';
import { env } from '~/app/env';
import { addAuthorizationHeaderInterceptor } from '~/app/utils/http/interceptors/authorization';
import { createSerializedApiErrorInterceptor } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';

export const api = Axios.create({
  baseURL: 'https://0ed1-2804-14c-4e0-8290-85d7-bc3a-61bf-99a2.ngrok-free.app',
});

api.interceptors.request.use(addAuthorizationHeaderInterceptor);
api.interceptors.response.use(undefined, createSerializedApiErrorInterceptor);
