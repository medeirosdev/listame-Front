import { useMemo } from 'react';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';
import { usePasswordInput } from '~/app/hooks/usePasswordInput';
import { useConfirmPasswordInput } from '~/app/hooks/useConfirmPasswordInput';
import { currentUserSelector } from '~/modules/auth/state/selectors/userSelectors';
import { useAppSelector } from '~/app/hooks/useAppSelector';

export type FormFieldType = {
  name: string;
  login: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const useEditProfileFormInputs = () => {
  const user = useAppSelector(currentUserSelector);

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
      label: 'Alterar senha',
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

  const nameInput = useMemo<IFormInputProps>(
    () => ({
      name: 'name',
      rules: {
        required: true,
      },
      textContentType: 'name',
      returnKeyType: 'next',
      autoCapitalize: 'sentences',
      label: 'Alterar nome',
      placeholder: 'Digite o novo nome para seu perfil',
      blurOnSubmit: false,
      defaultValue: user?.name,
    }),
    [user?.name],
  );

  const schema = useMemo(() => {
    return yup
      .object({
        name: yup.string(),
        currentPassword: currentPasswordSchema,
        newPassword: newPasswordSchema.notRequired(),
        confirmNewPassword: confirmPasswordSchema.notRequired(),
      })
      .required();
  }, []);

  return {
    inputs: [
      nameInput,
      currentPasswordInput,
      newPasswordInput,
      confirmPasswordInput,
    ],
    schema,
  };
};
