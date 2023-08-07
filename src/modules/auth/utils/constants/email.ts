export type EmailFeedbackTemplates = 'SIGNUP' | 'FORGOT_PASSWORD';

export const EMAIL_FEEDBACK: Record<EmailFeedbackTemplates, string> = {
  SIGNUP: 'Confirme a nova conta clicando no link enviado para o e-mail:',
  FORGOT_PASSWORD:
    'Enviamos as instruções para você recuperar a sua senha no seu e-mail:',
};
