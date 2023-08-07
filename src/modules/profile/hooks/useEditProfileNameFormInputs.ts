import { useMemo } from 'react';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';
import { currentUserSelector } from '~/modules/auth/state/selectors/userSelectors';
import { useAppSelector } from '~/app/hooks/useAppSelector';

export type FormFieldType = {
  name: string;
};

export const useEditProfileNameFormInputs = () => {
  const user = useAppSelector(currentUserSelector);
  const nameInput = useMemo<IFormInputProps>(
    () => ({
      name: 'name',
      rules: {
        required: true,
      },
      textContentType: 'name',
      returnKeyType: 'next',
      autoCapitalize: 'sentences',
      label: 'Novo nome',
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
      })
      .required();
  }, []);

  return {
    inputs: [nameInput],
    schema,
  };
};
