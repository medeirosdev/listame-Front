import { useMemo } from 'react';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';
import { IInputProps } from '~/app/components/Input/types';

export type FormFieldType = {
  name: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UseForgotPasswordFormInputsParams = {
  handleSubmit: () => void;
  inputVariant?: IInputProps['variant'];
};

export const useForgotPasswordFormInputs = (
  params: UseForgotPasswordFormInputsParams,
) => {
  const { handleSubmit, inputVariant = 'fullWhite' } = params;

  const emailInput = useMemo<IFormInputProps>(
    () => ({
      name: 'email',
      rules: {
        required: true,
      },
      textContentType: 'emailAddress',
      returnKeyType: 'done',
      autoCapitalize: 'none',
      onSubmitEditing: handleSubmit,
      label: 'E-mail',
      placeholder: 'Digite seu e-mail',
      blurOnSubmit: false,
      variant: inputVariant,
    }),
    [],
  );

  const schema = useMemo(() => {
    return yup
      .object({
        email: yup
          .string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
      })
      .required();
  }, []);

  return {
    inputs: [emailInput],
    schema,
  };
};
