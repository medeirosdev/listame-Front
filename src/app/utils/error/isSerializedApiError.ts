import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';

export const isSerializedApiError = (
  error: any,
): error is SerializedApiError => {
  return 'resolvedErrorMessage' in error;
};
