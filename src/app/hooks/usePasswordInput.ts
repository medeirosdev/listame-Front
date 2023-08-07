import { createRef, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';
import { PASSWORD_ERROR_MESSAGE } from '~/app/utils/constants/feedbacks';

interface IUsePasswordInputProps extends Partial<IFormInputProps> {}

export const usePasswordInput = (props?: IUsePasswordInputProps) => {
  const passwordInputRef = createRef<TextInput>();
  const [isShowingPassword, setIsShowingPassword] = useState(true);

  const passwordInput = useMemo<IFormInputProps>(
    () => ({
      ref: passwordInputRef,
      name: 'password',
      rules: {
        required: true,
      },
      textContentType: 'newPassword',
      autoCapitalize: 'none',
      returnKeyType: 'next',
      label: 'Senha',
      placeholder: 'Digite uma senha',
      iconName: isShowingPassword ? 'visibility' : 'visibility_off',
      secureTextEntry: isShowingPassword,
      onIconPress: () => setIsShowingPassword((prev) => !prev),
      blurOnSubmit: false,
      ...props,
    }),
    [isShowingPassword],
  );

  const passwordSchema = yup
    .string()
    .required('Senha obrigatória')
    .min(8, PASSWORD_ERROR_MESSAGE)
    .max(16, PASSWORD_ERROR_MESSAGE);

  return {
    passwordInputRef,
    passwordInput,
    passwordSchema,
  };
};
