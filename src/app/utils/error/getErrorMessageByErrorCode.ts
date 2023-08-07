import { AppErrorCodeEnum } from '~/app/types/AppErrorCodeEnum';

export const getErrorMessageByErrorCode = (
  code: AppErrorCodeEnum = AppErrorCodeEnum.UNKNOWN,
): string => {
  const messages = new Map<AppErrorCodeEnum, string>();
  messages.set(
    AppErrorCodeEnum.SESSION_CREATE_ERROR,
    'Credenciais inválidas, tente novamente',
  );
  messages.set(AppErrorCodeEnum.UNKNOWN, 'Algo deu errado, tente novamente');
  messages.set(
    AppErrorCodeEnum.INTERNAL_SERVER_ERROR,
    'Erro interno, tente novamente mais tarde',
  );
  messages.set(
    AppErrorCodeEnum.FORBIDDEN_WRONG_PASSWORD,
    'Senha inválida, tente novamente.',
  );
  messages.set(
    AppErrorCodeEnum.USER_MAIL_NOT_FOUND,
    'E-mail de usuário não encontrado, verifique o e-mail informado e tente novamente.',
  );

  return messages.get(code) as string;
};
