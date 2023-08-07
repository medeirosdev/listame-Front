import { createRef, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';
import { PASSWORD_ERROR_MESSAGE } from '~/app/utils/constants/feedbacks';

interface IUsePasswordInputProps extends Partial<IFormInputProps> {
  passwordFieldRef?: string;
}

export const useConfirmPasswordInput = (props: IUsePasswordInputProps) => {
  const { passwordFieldRef = 'password', ...formInputProps } = props;
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] =
    useState(true);
  const confirmPasswordInputRef = createRef<TextInput>();

  const confirmPasswordInput = useMemo<IFormInputProps>(
    () => ({
      ref: confirmPasswordInputRef,
      name: 'confirmPassword',
      rules: {
        required: true,
      },
      textContentType: 'password',
      autoCapitalize: 'none',
      label: 'Repita a senha',
      returnKeyType: 'done',
      placeholder: 'Digite novamente a senha',
      iconName: isShowingConfirmPassword ? 'visibility' : 'visibility_off',
      secureTextEntry: isShowingConfirmPassword,
      onIconPress: () => setIsShowingConfirmPassword((prev) => !prev),
      ...formInputProps,
    }),
    [isShowingConfirmPassword],
  );

  const confirmPasswordSchema = yup
    .string()
    .required('Confirmação de senha obrigatória')
    .oneOf([yup.ref(passwordFieldRef), undefined], 'As senhas não conferem')
    .min(8, PASSWORD_ERROR_MESSAGE)
    .max(16, PASSWORD_ERROR_MESSAGE);

  return {
    confirmPasswordInputRef,
    confirmPasswordInput,
    confirmPasswordSchema,
  };
};
