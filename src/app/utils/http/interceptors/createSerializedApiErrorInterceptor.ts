import { AxiosError } from 'axios';
import { AppErrorCodeEnum } from '~/app/types/AppErrorCodeEnum';
import { getErrorMessageByErrorCode } from '~/app/utils/error/getErrorMessageByErrorCode';

export interface SerializedApiError {
  status: number;
  message?: string;
  stack?: string;
  code: AppErrorCodeEnum;
  requestedUrl: string;
  resolvedErrorMessage: string;
}

export interface BaseErrorResponse {
  message: string;
  statusCode: number;
  code: AppErrorCodeEnum;
}

function createSerializedApiError(
  error: AxiosError<BaseErrorResponse>,
): SerializedApiError {
  const requestedUrl = error.request?.responseURL || error?.config?.url || '';

  console.info({ error });

  if (isAxiosError(error)) {
    const response = error.response;
    const responseError = response?.data;
    
    console.info(requestedUrl)
    return {
      status: response?.status ?? 500,
      requestedUrl,
      message: responseError?.message,
      resolvedErrorMessage: getErrorMessageByErrorCode(responseError?.code),
      code: responseError?.code ?? AppErrorCodeEnum.UNKNOWN,
    };
  }

  
  return {
    status: 500,
    message: String(error),
    requestedUrl,
    resolvedErrorMessage: getErrorMessageByErrorCode(
      AppErrorCodeEnum.INTERNAL_SERVER_ERROR,
    ),
    code: AppErrorCodeEnum.INTERNAL_SERVER_ERROR,
  };
}

function isAxiosError(e: any): e is AxiosError<BaseErrorResponse> {
  return e.isAxiosError;
}

export function createSerializedApiErrorInterceptor(error: any) {
  return Promise.reject(createSerializedApiError(error));
}
