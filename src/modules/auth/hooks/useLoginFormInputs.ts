import { createRef, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';

export const useLoginFormInputs = () => {
  const [isShowingPassword, setIsShowingPassword] = useState(true);
  const passwordInputRef = createRef<TextInput>();

  const emailInput = useMemo<IFormInputProps>(
    () => ({
      name: 'email',
      rules: {
        required: true,
      },
      textContentType: 'emailAddress',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      onSubmitEditing: () => passwordInputRef.current?.focus(),
      label: 'E-mail',
      placeholder: 'Digite seu e-mail',
      blurOnSubmit: false,
    }),
    [],
  );

  const passwordInput = useMemo<IFormInputProps>(
    () => ({
      name: 'password',
      rules: {
        required: true,
      },
      ref: passwordInputRef,
      textContentType: 'password',
      autoCapitalize: 'none',
      returnKeyLabel: 'entrar',
      label: 'Senha',
      placeholder: 'Digite sua senha',
      iconName: isShowingPassword ? 'visibility' : 'visibility_off',
      secureTextEntry: isShowingPassword,
      onIconPress: () => setIsShowingPassword((prev) => !prev),
    }),
    [isShowingPassword],
  );

  const schema = useMemo(() => {
    const passwordErrorMessage = 'A senha precisa ter no mínimo 8 caracteres';
    return yup
      .object({
        email: yup
          .string()
          .email('Digite um e-mail válido')
          .required('Campo obrigatório'),
        password: yup
          .string()
          .required('Campo obrigatório')
          .min(8, passwordErrorMessage)
          .max(16, passwordErrorMessage),
      })
      .required();
  }, []);

  return {
    inputs: [emailInput, passwordInput],
    schema,
  };
};
