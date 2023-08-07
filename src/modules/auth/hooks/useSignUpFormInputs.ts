import { createRef, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';
import { useSetAtom } from 'jotai';
import { signUpStepValues } from '~/modules/auth/state/atoms/signUpStepValues';
import { usePasswordInput } from '~/app/hooks/usePasswordInput';
import { useConfirmPasswordInput } from '~/app/hooks/useConfirmPasswordInput';

export type FormFieldType = {
  name: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormFieldTypeStep1 = Pick<FormFieldType, 'name' | 'login'>;
export type FormFieldTypeStep2 = Pick<
  FormFieldType,
  'email' | 'password' | 'confirmPassword'
>;

export type UseSignUpFormInputsParams = { handleSubmit: () => void };

export const useSignUpFormInputs = (params: UseSignUpFormInputsParams) => {
  const { handleSubmit } = params;

  const { passwordInputRef, passwordInput, passwordSchema } = usePasswordInput({
    onChangeText: (password) => updateSignUpFormValues({ password }),
    onSubmitEditing: () => confirmPasswordInputRef.current?.focus(),
  });

  const {
    confirmPasswordInputRef,
    confirmPasswordInput,
    confirmPasswordSchema,
  } = useConfirmPasswordInput({
    onChangeText: (confirmPassword) =>
      updateSignUpFormValues({ confirmPassword }),
    onSubmitEditing: handleSubmit,
  });

  const initialValues: FormFieldType = {
    name: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const updateSignUpFormValues = useSetAtom(signUpStepValues);

  const loginInputRef = createRef<TextInput>();
  const emailInputRef = createRef<TextInput>();

  const nameInput = useMemo<IFormInputProps>(
    () => ({
      name: 'name',
      rules: {
        required: true,
      },
      textContentType: 'name',
      returnKeyType: 'next',
      autoCapitalize: 'words',
      label: 'Nome',
      onChangeText: (name) => updateSignUpFormValues({ name }),
      placeholder: 'Digite seu nome completo',
      blurOnSubmit: false,
      onSubmitEditing: () => loginInputRef.current?.focus(),
    }),
    [],
  );

  const loginInput = useMemo<IFormInputProps>(
    () => ({
      ref: loginInputRef,
      name: 'login',
      rules: {
        required: true,
      },
      textContentType: 'nickname',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      label: 'Nome de usuário',
      onChangeText: (login) => updateSignUpFormValues({ login }),
      placeholder: 'Digite um nome de usuário',
      blurOnSubmit: false,
      onSubmitEditing: () => emailInputRef.current?.focus(),
    }),
    [],
  );

  const emailInput = useMemo<IFormInputProps>(
    () => ({
      ref: emailInputRef,
      name: 'email',
      rules: {
        required: true,
      },
      textContentType: 'emailAddress',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      onSubmitEditing: () => passwordInputRef.current?.focus(),
      onChangeText: (email) => updateSignUpFormValues({ email }),
      label: 'E-mail',
      placeholder: 'Digite seu e-mail',
      blurOnSubmit: false,
    }),
    [],
  );

  const schema = useMemo(() => {
    return yup
      .object({
        name: yup.string().required('Nome obrigatório'),
        login: yup.string().required('Nome de usuário obrigatório'),
        email: yup
          .string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema,
      })
      .required();
  }, []);

  const step1Schema = useMemo(() => {
    return schema.clone().pick(['name', 'login']);
  }, [schema]);

  const step2Schema = useMemo(() => {
    return schema.clone().pick(['email', 'password', 'confirmPassword']);
  }, [schema]);

  const step1 = {
    schema: step1Schema,
    inputs: [nameInput, loginInput],
  };

  const step2 = {
    schema: step2Schema,
    inputs: [emailInput, passwordInput, confirmPasswordInput],
  };

  return {
    step1,
    step2,
    initialValues,
  };
};
