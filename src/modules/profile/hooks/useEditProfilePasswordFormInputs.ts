import { useMemo } from 'react';
import * as yup from 'yup';
import { usePasswordInput } from '~/app/hooks/usePasswordInput';
import { useConfirmPasswordInput } from '~/app/hooks/useConfirmPasswordInput';

export type FormFieldType = {
  name: string;
  login: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const useEditProfilePasswordFormInputs = () => {
  const {
    passwordInput: currentPasswordInput,
    passwordSchema: currentPasswordSchema,
  } = usePasswordInput({
    label: 'Senha atual',
    placeholder: 'Digite sua senha atual',
    name: 'currentPassword',
    onSubmitEditing: () => confirmPasswordInputRef.current?.focus(),
  });

  const { passwordInput: newPasswordInput, passwordSchema: newPasswordSchema } =
    usePasswordInput({
      label: 'Nova senha',
      placeholder: 'Digite a nova senha',
      name: 'newPassword',
      onSubmitEditing: () => confirmPasswordInputRef.current?.focus(),
    });

  const {
    confirmPasswordInput,
    confirmPasswordInputRef,
    confirmPasswordSchema,
  } = useConfirmPasswordInput({
    passwordFieldRef: 'newPassword',
    name: 'confirmNewPassword',
    label: 'Confirmar a nova senha',
    onSubmitEditing: () => confirmPasswordInputRef.current?.focus(),
  });

  const schema = useMemo(() => {
    return yup
      .object({
        currentPassword: currentPasswordSchema,
        newPassword: newPasswordSchema,
        confirmNewPassword: confirmPasswordSchema,
      })
      .required();
  }, []);

  return {
    inputs: [currentPasswordInput, newPasswordInput, confirmPasswordInput],
    schema,
  };
};
